export interface IReaction {
  reactionId: string;
  blogId: string;
  userId: string | null;
  reactionType: ReactionType;
  passive: boolean;
  createdAt?: string;
  updatedAt?: string;
}

// defines the type of the object passed to Sequelize’s model.create
export type IReactionInput = Omit<IReaction, 'reactionId'>;

export type ReactionType = 'thumbsUp' | 'wow' | 'heart';

export type NewReactionType = Pick<IReaction, 'blogId' | 'reactionType'>;
