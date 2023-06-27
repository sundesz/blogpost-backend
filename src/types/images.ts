export type ImageType = 'blog' | 'user';

export interface ImageAttributes {
  imageId: string;
  name: string;
  originalName: string;
  fileLocation: string;
  createdAt?: string;
  updatedAt?: string;
}

// defines the type of the object passed to Sequelize’s model.create
export type ImageInputAttributes = Omit<ImageAttributes, 'imageId'>;
