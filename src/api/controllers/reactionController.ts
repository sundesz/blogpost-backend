import { NextFunction, RequestHandler } from 'express';
import { Reaction } from '../../db/models';
import { IdParams, NewReactionParams } from '../../types';

/**
 * Create new reaction
 */
const create: RequestHandler<IdParams, unknown, NewReactionParams> = async (
  req,
  res,
  next: NextFunction
) => {
  try {
    // TODO:: cannot react on own post
    const userId = req.session.data?.userId;
    const { id: blogId } = req.params;
    const { reactionType } = req.body;

    const newReaction = await Reaction.create({
      blogId,
      userId: userId ?? null,
      reactionType,
      passive: false,
    });

    res.json(newReaction);
  } catch (error: unknown) {
    next(error);
  }
};

/**
 * deactivate reaction
 * only admin can delete the reaction (checked through isAdmin middleware)
 */
const remove: RequestHandler = async (req, res, next: NextFunction) => {
  try {
    const { id: reactionId } = req.params;

    await Reaction.destroy({
      where: {
        reactionId,
      },
    });

    res.status(204).end();
  } catch (error) {
    next(error);
  }
};

export default {
  create,
  remove,
};
