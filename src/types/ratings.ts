export interface RatingAttributes {
  ratingId: string;
  commentId: string;
  rating: number;
}

// defines the type of the object passed to Sequelize’s model.create
export type RatingInputAttributes = Omit<RatingAttributes, 'ratingId'>;

export type NewRatingAttributes = Pick<RatingAttributes, 'rating'>;
