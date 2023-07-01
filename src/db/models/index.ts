import Blog from './blogs';
import Reaction from './reaction';
import User from './users';
import Session from './session';
import Rating from './ratings';
import Comment from './comments';
import Image from './images';

User.hasMany(Blog, { foreignKey: 'user_id' });
Blog.belongsTo(User, { foreignKey: 'user_id' });

Image.hasOne(User, { foreignKey: 'image_id' });
User.belongsTo(Image, { foreignKey: 'image_id' });

Blog.hasMany(Reaction, { foreignKey: 'blog_id' });
Reaction.belongsTo(Blog, { foreignKey: 'blog_id' });

User.hasMany(Reaction, { foreignKey: 'user_id' });
Reaction.belongsTo(User, { foreignKey: 'user_id' });

Blog.hasMany(Comment, { foreignKey: 'blog_id' });
Comment.belongsTo(Blog, { foreignKey: 'blog_id' });

User.hasMany(Comment, { foreignKey: 'user_id' });
Comment.belongsTo(User, { foreignKey: 'user_id' });

Comment.hasOne(Rating, { foreignKey: 'comment_id' });
Rating.belongsTo(Comment, { foreignKey: 'comment_id' });

// Blog.hasMany(Image, { foreignKey: 'blog_id' });
// Image.belongsTo(Blog, { foreignKey: 'blog_id' });

export { User, Blog, Reaction, Session, Rating, Comment, Image };
