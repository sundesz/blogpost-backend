export interface BlogAttributes {
  blogId: string;
  userId: string;
  title: string;
  content: string;
  slug: string;
  published: boolean;
  passive: boolean;
  createdAt?: string;
  updatedAt?: string;
}

// defines the type of the object passed to Sequelize’s model.create
export type BlogInputAttributes = Omit<BlogAttributes, 'blogId'>;
// export interface BlogInputAttributes
//   extends Optional<BlogAttributes, 'blogId'> {}

export type NewBlogParams = Pick<
  BlogAttributes,
  'title' | 'content' | 'published' | 'slug'
>;

export type UpdateBlogParams = Pick<
  BlogAttributes,
  'title' | 'content' | 'slug' | 'published' | 'userId'
>;
