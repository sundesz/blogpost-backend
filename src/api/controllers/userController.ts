import { NextFunction, RequestHandler } from 'express';
import bcrypt from 'bcrypt';
import crypto from 'node:crypto';
import fs from 'fs';
import { SALT } from '../../config';
import { Image, User } from '../../db/models';
import { userMessage } from '../../utils/userMessages';
import { Sequelize } from 'sequelize';
import { NewUserParams } from '../../types';
import sharp from 'sharp';
import createHttpError from 'http-errors';
import { SRC_DIR } from '../../index';

/**
 * Create user
 */
const create: RequestHandler<unknown, unknown, NewUserParams, unknown> = async (
  req,
  res,
  next: NextFunction
) => {
  try {
    const { name, email, password, role } = req.body;
    const userId = crypto.randomUUID();
    const profilePic = req.file;

    // Check if user already exist
    const isUserExists = await User.count({ where: { email } });
    if (isUserExists) {
      throw createHttpError(409, userMessage.warning.USERNAME_ALREADY_EXISTS);
    }

    // Insert image
    let profilePicDestinationPath: string | undefined = undefined;
    let imageData: Image | null = null;

    if (profilePic) {
      const dir = `${SRC_DIR}/../uploads/profile_pictures`;

      if (!fs.existsSync(dir)) {
        await fs.promises.mkdir(dir, { recursive: true });
      }

      profilePicDestinationPath = `/uploads/profile_pictures/${userId}.png`;

      await sharp(profilePic.buffer)
        .resize({
          fit: sharp.fit.contain,
          withoutEnlargement: true,
          width: 100,
        })
        .png({
          // https://sharp.pixelplumbing.com/api-output#png
          compressionLevel: 8,
          palette: true,
          quality: 75, // play around with this number until you get the file size you want
        })
        .toFile('./' + profilePicDestinationPath);

      imageData = await Image.create({
        name: userId,
        originalName: profilePic.originalname,
        fileLocation: profilePicDestinationPath,
      });
    }

    // Insert User
    const passwordHash = await bcrypt.hash(password, Number(SALT));

    await User.create({
      userId,
      email,
      name,
      passwordHash,
      isActive: true,
      role,
      imageId: imageData ? imageData.imageId : imageData,
    });

    res.status(201).json(userMessage.info.USER_CREATED);
  } catch (error: unknown) {
    next(error);
  }
};

/**
 * Deactivate/ Activate user
 * only admin can activate / deactivate user (checked through isAdmin middleware)

 */
const toggle: RequestHandler = async (req, res, next: NextFunction) => {
  try {
    const { id: userId } = req.params;

    await User.update(
      { isActive: Sequelize.literal('NOT is_active') },
      { where: { userId } }
    );

    res.status(204).end();
  } catch (error) {
    next(error);
  }
};

export default {
  create,
  toggle,
};
