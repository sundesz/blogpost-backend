import { NextFunction, RequestHandler } from 'express';
import { Blog, User } from '../../db/models';
import { AllQueryParams, IdParams } from '../../types';
import { Op, literal } from 'sequelize';
import { getPagination, getPagingData } from './helper';
import { sequelize } from '../../db';

const blogCountSubQuery = () => {
  // TODO: pass has access to show blog.published = true
  return sequelize.literal(`(
    SELECT COUNT(*)::int
    FROM blogs
    WHERE
        blogs.user_id = "User".user_id
        AND
        blogs.published = true
    )`);
};

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

    let where = {};
    where = { published: true };
    if (req.session.data !== undefined) {
      where = req.session.data.role === 'admin' ? {} : where;
    }

    const author = await User.findOne({
      attributes: ['email', 'name', 'userId', 'imageId'],
      where: { userId, isActive: true, role: 'author' },
      include: {
        model: Blog,
        attributes: [
          'blogId',
          'title',
          [
            literal(
              "substring(regexp_replace(content, '<[^>]+>', '', 'g'), 1, 50)"
            ),
            'content',
          ],
          'slug',
          'updatedAt',
          'published',
        ],
        required: false,
        where,
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

    if (orderBy && orderDir) {
      order = [[String(orderBy), String(orderDir)]];
    }

    const { limit, offset } = getPagination(pageNumber);
    const authorsData = await User.findAndCountAll({
      attributes: [
        'email',
        'name',
        'userId',
        'imageId',
        [blogCountSubQuery(), 'blogCount'],
      ],
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

/**
 * Get all author names
 */
const getAuthorNames: RequestHandler = async (
  _req,
  res,
  next: NextFunction
) => {
  try {
    const results = await User.findAll({
      attributes: ['name', 'userId'],
      where: { role: 'author', isActive: true },
    });

    res.json(results);
  } catch (error) {
    next(error);
  }
};

export default {
  getAuthor,
  getAllAuthor,
  getAuthorNames,
};
