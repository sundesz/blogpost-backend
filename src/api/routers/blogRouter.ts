import { Router } from 'express';
import {
  blogFinder,
  isAdmin,
  isAdminOrAuthor,
  isAuthor,
} from '../../middleware/helper';
import blogController from '../controllers/blogController';
import { inPostImageUpload } from '../../middleware/imageUpload';

const blogRouter = Router();

blogRouter.get('/', blogController.getAllBlogs);
blogRouter.get('/:slug', blogController.getBlog);
blogRouter.post(
  '/blogImage',
  inPostImageUpload.single('upload'),
  blogController.uploadImage
);
blogRouter.post('/', isAuthor, blogController.create);
blogRouter.put('/toggle/:id', isAdmin, blogFinder, blogController.toggle);
blogRouter.put('/:id', isAdminOrAuthor, blogFinder, blogController.update);

export default blogRouter;
