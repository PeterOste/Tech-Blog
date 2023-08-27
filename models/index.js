const User = require('./User');
const Post = require('./Post');
const Comment = require('./Comment');

// A user can have multiple posts
User.hasMany(Post, {
    foreignKey: 'user_id',
});

// A post belongs to a single user
Post.belongsTo(User, {
    foreignKey: 'user_id',
});

// A user can have multiple comments
User.hasMany(Comment, {
    foreignKey: 'user_id',
});

// A comment belongs to a single user
Comment.belongsTo(User, {
    foreignKey: 'user_id',
});

// A post can have multiple comments
Post.hasMany(Comment, {
    foreignKey: 'post_id',
});

// A comment belongs to a single post
Comment.belongsTo(Post, {
    foreignKey: 'post_id',
});

module.exports = { User, Post, Comment };