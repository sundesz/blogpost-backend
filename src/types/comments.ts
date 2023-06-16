export interface IComment {
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
export type ICommentInput = Omit<IComment, 'commentId'>;

export type NewCommentType = Pick<
  IComment,
  'title' | 'content' | 'published'
> & { rating: number };
