export type ImageType = 'blog' | 'user';

export interface IImage {
  imageId: string;
  imageType: ImageType;
  blogId?: string;
  userId?: string;
  name: string;
  originalName: string;
  fileLocation: string;
  createdAt?: string;
  updatedAt?: string;
}

// defines the type of the object passed to Sequelize’s model.create
export type IImageInput = Omit<IImage, 'imageId' | 'imageType'>;

type NewImageType = Omit<IImage, 'imageId' | 'userId' | 'blogId'>;

export type NewBlogImageType = NewImageType & Required<Pick<IImage, 'blogId'>>;
export type NewUserImageType = NewImageType & Required<Pick<IImage, 'userId'>>;
