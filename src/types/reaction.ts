export type ReactionType = 'thumbsUp' | 'wow' | 'heart';

export interface ReactionAttributes {
  reactionId: string;
  blogId: string;
  userId: string | null;
  reactionType: ReactionType;
  passive: boolean;
  createdAt?: string;
  updatedAt?: string;
}

// defines the type of the object passed to Sequelize’s model.create
export type ReactionInputAttributes = Omit<ReactionAttributes, 'reactionId'>;

export type NewReactionParams = Pick<
  ReactionAttributes,
  'blogId' | 'reactionType'
>;
