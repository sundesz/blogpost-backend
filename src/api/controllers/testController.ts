import { RequestHandler } from 'express';
import { Blog, Comment, Rating, Reaction, User } from '../../db/models';

const resetDatabase: RequestHandler = async (_req, res) => {
  await User.sync({ force: true });
  await Blog.sync({ force: true });
  await Reaction.sync({ force: true });
  await Comment.sync({ force: true });
  await Rating.sync({ force: true });

  res.status(204).end();
};

export default {
  resetDatabase,
};
