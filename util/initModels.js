
const {User} = require('../models/user.model');
const {Post} = require('../models/post.model');
const {Comment} = require('../models/comment.model');

const initModels = () => {
    //models relations
User.hasMany(Post);
Post.belongsTo(User);

Post.hasMany(Comment);
Comment.belongsTo(Post);

User.hasMany(Comment);
Comment.belongsTo(User);
};

module.exports = {initModels};