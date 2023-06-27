export interface CommentAttributes {
  commentId: string;
  blogId: string;
  userId: string | null;
  parentId: string | null;
  title: string;
  content: string;
  published: boolean;
  passive: boolean;
  createdAt?: string;
  updatedAt?: string;
}

// defines the type of the object passed to Sequelize’s model.create
export type CommentInputAttributes = Omit<CommentAttributes, 'commentId'>;

//
export type NewCommentParams = Pick<
  CommentAttributes,
  'title' | 'content' | 'published'
> & { rating: number };
