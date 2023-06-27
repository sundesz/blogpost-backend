export interface BlogImageAttributes {
  blogImageId: string;
  blogId: string;
  imageId: string;
  passive: boolean;
}

// defines the type of the object passed to Sequelize’s model.create
export type BlogInputAttributes = Omit<BlogImageAttributes, 'blogImageId'>;
