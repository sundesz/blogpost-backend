import { NextFunction, RequestHandler } from 'express';
import { Blog, User } from '../../db/models';
import { sequelize } from '../../db';

/**
 * Get author
 */
const getAuthor: RequestHandler = async (req, res, next: NextFunction) => {
  try {
    const { id: userId } = req.params as { id: string };

    const author = await User.findOne({
      attributes: ['email', 'name', 'userId'],
      where: { userId, isActive: true, role: 'author' },
      include: {
        model: Blog,

        attributes: [
          'blogId',
          'title',
          [sequelize.fn('LEFT', sequelize.col('content'), 50), 'content'], // Return first n characters in the string
          'slug',
          'updatedAt',
        ],
        required: false,
        where: { published: true },
      },
    });

    if (!author) {
      return res.status(404).end();
    }

    res.json(author);
  } catch (error) {
    next(error);
  }
};

/**
 * Get all author
 */
const getAllAuthor: RequestHandler = async (_req, res, next: NextFunction) => {
  try {
    const authors = await User.findAll({
      attributes: ['email', 'name', 'userId'],
      where: { role: 'author', isActive: true },
      include: {
        model: Blog,
        attributes: [
          'blogId',
          'title',
          [sequelize.fn('LEFT', sequelize.col('content'), 50), 'content'], // Return first n characters in the string
          'slug',
          'updatedAt',
        ],
        required: false,
        where: { published: true },
      },
    });
    res.json(authors);
  } catch (error) {
    next(error);
  }
};

export default {
  getAuthor,
  getAllAuthor,
};
