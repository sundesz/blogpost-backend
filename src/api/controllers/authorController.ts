import { NextFunction, RequestHandler } from 'express';
import { Blog, User } from '../../db/models';
import { sequelize } from '../../db';
import { AllQueryParams, IdParams } from '../../types';
import { Op } from 'sequelize';
import { getPagination, getPagingData } from './helper';

/**
 * Get author
 */
const getAuthor: RequestHandler<IdParams> = async (
  req,
  res,
  next: NextFunction
) => {
  try {
    const { id: userId } = req.params;

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
const getAllAuthor: RequestHandler<
  unknown,
  unknown,
  unknown,
  AllQueryParams
> = async (req, res, next: NextFunction) => {
  try {
    const { page, columnName, columnValue, orderBy, orderDir } = req.query;
    const pageNumber = Number(page);

    let where;
    let order: [[string, string]] = [['name', 'DESC']];

    where = {
      [Op.and]: [{ role: 'author' }, { isActive: true }],
    };

    if (columnName && columnValue) {
      where = {
        [Op.and]: [{ role: 'author' }, { isActive: true }],
        [columnName]: { [Op.iLike]: `%${columnValue}%` },
      };
    }

    // where: { role: 'author', isActive: true },

    if (orderBy && orderDir) {
      order = [[String(orderBy), String(orderDir)]];
    }

    const { limit, offset } = getPagination(pageNumber);
    const authorsData = await User.findAndCountAll({
      attributes: ['email', 'name', 'userId'],
      // include: {
      //   model: Blog,
      //   attributes: [
      //     'blogId',
      //     'title',
      //     [sequelize.fn('LEFT', sequelize.col('content'), 50), 'content'], // Return first n characters in the string
      //     'slug',
      //     'updatedAt',
      //   ],
      //   required: false,
      //   where: { published: true },
      // },
      where,
      order,
      offset,
      limit,
    });

    res.json(getPagingData(authorsData, pageNumber));
  } catch (error) {
    next(error);
  }
};

export default {
  getAuthor,
  getAllAuthor,
};
