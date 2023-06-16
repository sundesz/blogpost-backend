export interface IRating {
  ratingId: string;
  commentId: string;
  rating: number;
}

// defines the type of the object passed to Sequelize’s model.create
export type IRatingInput = Omit<IRating, 'ratingId'>;

export type NewRatingType = Pick<IRating, 'rating'>;
