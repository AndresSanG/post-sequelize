const {Comment} = require('../models/comment.model.js');
const {User} = require('../models/user.model');
// const {Post} = require('../models/post.model.js');

exports.getAllcomments = async (req, res) => {
	try {
		const comments = await Comment.findAll({
            where: { status: 'active' },
            include:[{model:User}]    
        });

		res.status(200).json({
			status: 'success',
			data: { comments },
		});
	} catch (error) {
		console.log(error);
	}
};

exports.getcommentById = async (req, res) => {
	try {
		const { id } = req.params;

		const comment = await Comment.findOne({
            where: {status:'active',id} });

        if(!comment){
            res.status(404).json({
                status:'error',
                message:'cooment not found'
            });
            return;
        }

		res.status(200).json({
			status: 'success',
			data: { comment },
		});
	} catch (error) {
		console.log(error);
	}
};

exports.createComment = async (req, res) => {
	try {
		const { text, postId, userId } = req.body;

        if (!text||!postId||!userId){
            res.status(400).json({
                status:'error',
                message:'must provide all camps'
            });
            return;
        }

		const newComment = await Comment.create({
			text, postId, userId });

		res.status(201).json({
			status: 'success',
			data: { newComment },
		});
	} catch (error) {
		console.log(error);
	}
};