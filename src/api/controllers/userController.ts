import { NextFunction, RequestHandler } from 'express';
import bcrypt from 'bcrypt';
import { SALT } from '../../config';
import { User } from '../../db/models';
import { userMessage } from '../../utils/userMessages';
import { Sequelize } from 'sequelize';
import { IdParams, NewUserParams } from '../../types';

/**
 * Create user
 */
const create: RequestHandler<unknown, unknown, NewUserParams> = async (
  req,
  res,
  next: NextFunction
) => {
  try {
    const { name, email, password, role } = req.body;
    const passwordHash = await bcrypt.hash(password, Number(SALT));

    await User.create({
      email,
      name,
      passwordHash,
      isActive: true,
      role,
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
const toggle: RequestHandler<IdParams> = async (
  req,
  res,
  next: NextFunction
) => {
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
