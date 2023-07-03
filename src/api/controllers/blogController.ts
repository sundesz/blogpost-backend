import { NextFunction, RequestHandler } from 'express';
import { sequelize } from '../../db';
import { Blog, Comment, Rating, User } from '../../db/models';
import {
  AllQueryParams,
  NewBlogParams,
  ReactionType,
  UpdateBlogParams,
} from '../../types';
import { getPagination, getPagingData } from './helper';
import { Op } from 'sequelize';

/**
 * Reaction count subquery
 * @param reactionType
 * @returns
 */
const reactionCountSubQuery = (reactionType: ReactionType) => {
  return sequelize.literal(`(
    SELECT COUNT(*)::int
    FROM reaction
    WHERE
        reaction.blog_id = "Blog".blog_id
        AND
        reaction.reaction_type ='${reactionType}')`);
};

/**
 * Rating count subquery
 * @returns
 */
const ratingCountSubQuery = (slug: string, rating: number) => {
  return sequelize.literal(`(
    SELECT COUNT(*)::int
    FROM blogs
    LEFT JOIN comments ON blogs.blog_id = comments.blog_id
    LEFT JOIN ratings ON comments.comment_id = ratings.comment_id
    WHERE blogs.slug = '${slug}'
      AND ratings.rating ='${rating}')`);
};

interface BlogParams {
  slug: string;
}

/**
 * Get a blog
 */
const getBlog: RequestHandler<BlogParams> = async (
  req,
  res,
  next: NextFunction
) => {
  try {
    const { slug } = req.params;

    const blog = await Blog.findOne({
      attributes: [
        'blogId',
        'title',
        'content',
        'slug',
        'published',
        'updatedAt',
        [reactionCountSubQuery('thumbsUp'), 'thumbsUp'],
        [reactionCountSubQuery('wow'), 'wow'],
        [reactionCountSubQuery('heart'), 'heart'],

        [ratingCountSubQuery(slug, 1), 'rating1'],
        [ratingCountSubQuery(slug, 2), 'rating2'],
        [ratingCountSubQuery(slug, 3), 'rating3'],
        [ratingCountSubQuery(slug, 4), 'rating4'],
        [ratingCountSubQuery(slug, 5), 'rating5'],
      ],
      include: [
        {
          model: User,
          attributes: ['name', 'email', 'userId'],
          where: { isActive: true },
        },
        {
          model: Comment,
          include: [
            {
              model: Rating,
              attributes: ['ratingId', 'rating'],
            },
            {
              model: User,
              attributes: ['name', 'email', 'userId'],
              where: { isActive: true },
              required: false,
            },
          ],
          attributes: [
            'commentId',
            'blogId',
            // 'userId',
            'title',
            'content',
            'updatedAt',
          ],
          where: { published: true, passive: false },
          required: false,
        },
      ],
      where: { slug, published: true, passive: false },
      order: [['updatedAt', 'DESC']],
    });

    if (!blog) {
      return res.status(404).end();
    }

    res.json(blog);
  } catch (error: unknown) {
    next(error);
  }
};

/**
 * Get all blogs
 */
const getAllBlogs: RequestHandler<
  unknown,
  unknown,
  unknown,
  AllQueryParams
> = async (req, res, next: NextFunction) => {
  try {
    const { page, columnName, columnValue, orderBy, orderDir } = req.query;
    const pageNumber = Number(page);

    let where;
    let order: [[string, string]] = [['updatedAt', 'DESC']];

    where = { [Op.and]: { published: true } };

    if (columnName && columnValue) {
      where = {
        [columnName]: { [Op.iLike]: `%${columnValue}%` },
        [Op.and]: { published: true },
      };
    }

    if (orderBy && orderDir) {
      order = [[String(orderBy), String(orderDir)]];
    }

    const { limit, offset } = getPagination(pageNumber);

    const blogsData = await Blog.findAndCountAll({
      attributes: [
        'blogId',
        'title',
        [sequelize.fn('LEFT', sequelize.col('content'), 50), 'content'], // Return first n characters in the string
        'slug',
      ],
      include: { model: User, attributes: ['name', 'email', 'userId'] },
      where,
      order,
      offset,
      limit,
    });

    res.json(getPagingData(blogsData, pageNumber));
  } catch (error: unknown) {
    next(error);
  }
};

/**
 * Create new Blog
 * only admin and authors can create blog (checked through isAdminOrAuthor middleware)
 */
const create: RequestHandler<unknown, unknown, NewBlogParams> = async (
  req,
  res,
  next: NextFunction
) => {
  try {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const userId = req.session.data!.userId;

    const { title, content, published, slug } = req.body;
    const blog = await Blog.create(
      {
        userId,
        title,
        content,
        slug,
        published: published ?? false,
        passive: false,
      }
      // { returning: false }
    );

    // await Image.create({
    //   // imageType: 'blog',
    //   blogId: blog.blogId,
    //   name,
    //   originalName,
    //   fileLocation,
    // });

    res.json(blog.slug);
  } catch (error: unknown) {
    next(error);
  }
};

/**
 * Update Blog
 * only admin and authors can update blog (checked through isAdminOrAuthor middleware)
 */
const update: RequestHandler<unknown, unknown, UpdateBlogParams> = async (
  req,
  res,
  next: NextFunction
) => {
  try {
    const sessionData = req.session.data;

    const blog = req.blog as Blog;
    const { title, content, slug, published, userId } = req.body;

    // only admin can change the user
    const updateUserId = sessionData?.role === 'admin' ? userId : blog.userId;

    blog.title = title ?? blog.title;
    blog.content = content ?? blog.content;
    blog.slug = slug ?? blog.slug;
    blog.userId = updateUserId ?? blog.userId;
    blog.published = published ?? blog.published;

    await blog.save();

    res.json(blog.slug);
  } catch (error: unknown) {
    next(error);
  }
};

/**
 * Deactivate/Activate Blog
 */
const toggle: RequestHandler = async (req, res, next: NextFunction) => {
  try {
    const sessionData = req.session.data;
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const blog = req.blog!;

    // only admin and blog creator can deactivate /activate the blog
    const hasAccess =
      sessionData?.role === 'admin' || sessionData?.userId === blog.userId;

    if (!hasAccess) {
      return res.status(401).end();
    }

    blog.passive = !blog.passive;
    await blog.save();

    res.status(204).end();
  } catch (error) {
    next(error);
  }
};

export default {
  getBlog,
  getAllBlogs,
  create,
  update,
  toggle,
};
