import { NextFunction, RequestHandler } from 'express';
import { Comment, Rating } from '../../db/models';
import { NewCommentType } from '../../types/comments';

/**
 * Create new comment
 */
const create: RequestHandler = async (req, res, next: NextFunction) => {
  try {
    // TODO:: cannot comment on own post && only one comment per user
    const userId = req.session.data?.userId;
    const { id: blogId } = req.params as { id: string };
    const { title, content, published, rating } = req.body as NewCommentType;

    const newComment = await Comment.create({
      blogId,
      userId: userId ?? null,
      title,
      content,
      published,
      passive: false,
    });

    if (newComment && rating) {
      await Rating.create({ commentId: newComment.commentId, rating });
    }

    res.json(newComment);
  } catch (error: unknown) {
    next(error);
  }
};

/**
 * Update comment
 * only admin or user can update the comment (checked through isAdmin middleware)
 */
const update: RequestHandler = async (req, res, next: NextFunction) => {
  try {
    const { id: commentId } = req.params as { id: string };
    const { title, content, published, rating } = req.body as NewCommentType;

    const comment = await Comment.findByPk(commentId);

    if (!comment) {
      return res.status(404).end();
    }

    comment.title = title ?? comment.title;
    comment.content = content ?? comment.content;
    comment.published = published ?? comment.published;

    await comment.save();

    const ratingBlog = await Rating.findOne({ where: { commentId } });
    if (ratingBlog) {
      ratingBlog.rating = rating ?? ratingBlog.rating;
      await ratingBlog?.save();
    }

    res.status(204).end();
  } catch (error) {
    next(error);
  }
};

/**
 * Deactivate/Activate comment
 */
const toggle: RequestHandler = async (req, res, next: NextFunction) => {
  try {
    const sessionData = req.session.data;
    const { id: commentId } = req.params as { id: string };

    const comment = await Comment.findByPk(commentId);

    if (!comment) {
      return res.status(404).end();
    }

    // only admin and comment creator can deactivate /activate the blog
    const hasAccess =
      sessionData?.role === 'admin' || sessionData?.userId === comment.userId;
    if (!hasAccess) {
      return res.status(403).end();
    }

    comment.passive = !comment.passive;
    await comment.save();

    res.status(204).end();
  } catch (error) {
    next(error);
  }
};

export default {
  create,
  update,
  toggle,
};
