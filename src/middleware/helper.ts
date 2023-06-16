import { NextFunction, RequestHandler } from 'express';
import { Blog, User } from '../db/models';

/**
 * Finds blog by id
 */
export const blogFinder: RequestHandler = async (
  req,
  res,
  next: NextFunction
) => {
  try {
    const { id: blogId } = req.params as { id: string };

    const blog = await Blog.findOne({
      attributes: ['blogId', 'title', 'userId', 'content', 'slug', 'published'],
      where: { blogId },
      order: [['updatedAt', 'DESC']],
    });

    if (!blog) {
      return res.status(404).end();
    }

    req.blog = blog;
    next();
  } catch (error) {
    next(error);
  }
};

/**
 * Find user by email
 */
export const getUser = async (email: string) => {
  return await User.findOne({
    where: { email, isActive: true },
    attributes: ['userId', 'name', 'email', 'passwordHash', 'role'],
  });
};

/**
 * Check if user is authenticate
 */
export const isAuthenticated: RequestHandler = (
  req,
  res,
  next: NextFunction
) => {
  try {
    if (!req.session.isAuth) {
      return res.status(401).end();
    }

    next();
  } catch (error) {
    next(error);
  }
};

/**
 * Check user permission. Only admin and author can create/edit blogs
 */
export const isAdminOrAuthor: RequestHandler = (
  req,
  res,
  next: NextFunction
) => {
  try {
    if (!req.session.isAuth) {
      return res.status(401).end();
    }

    if (
      !(
        req.session.data?.role === 'admin' ||
        req.session.data?.role === 'author'
      )
    ) {
      return res.status(403).end();
    }

    next();
  } catch (error) {
    next(error);
  }
};

/**
 * Check user permission. Only admin
 */
export const isAdmin: RequestHandler = (req, res, next: NextFunction) => {
  try {
    if (!req.session.data?.userId) {
      return res.status(401).end();
    }

    if (req.session.data?.role !== 'admin') {
      return res.status(403).end();
    }

    next();
  } catch (error) {
    next(error);
  }
};

/**
 * Check user permission. Only author
 */
export const isAuthor: RequestHandler = (req, res, next: NextFunction) => {
  try {
    if (!req.session.data?.userId) {
      return res.status(401).end();
    }

    if (req.session.data?.role !== 'author') {
      return res.status(403).end();
    }

    next();
  } catch (error) {
    next(error);
  }
};
