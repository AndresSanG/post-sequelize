const {Post} = require('../models/post.model')
const {AppError} = require('../util/appError');
const {catchAsync} = require('../util/catchAsync');
// Utils
const { filterObj } = require('../util/filterObj');

// Get all posts
exports.getAllPosts = catchAsync( async (req, res, next) => {
	
	const posts = await Post.findAll({where:{status:'active'}})
		res.status(200).json({
			status: 'success',
			data: {
				posts,
			},
		});
	
});

// Get post by id
exports.getPostById = catchAsync(async (req, res, next) => {

		const { id } = req.params;
		const post = await Post.findOne({where:{id:id,status:'active'}});

		if (!post) {
			return next(new AppError(404,'No post found with the given ID'));
		}
	
		res.status(200).json({
			status: 'success',
			data: {
				post,
			},
		});	
})

// Save post to database
exports.createPost = catchAsync(async (req, res, next) => {

		const {title, content, userId} = req.body;
		if(!title||!content||!userId){
			return next(new AppError(400,'bring all info'));}
		const newPost = await Post.create({
			title:title,
			content:content,
			userId: userId});
	
		res.status(201).json({
			status: 'success',
			data: { newPost },
		});
		
	
})

// Update post (put)
exports.updatePostPut =async (req, res, next) => {
	try {
		const { id } = req.params;
	const { title, content, author } = req.body;

	// Validate the data has some value
	if (
		!title ||
		!content ||
		!author ||
		title.length === 0 ||
		content.length === 0 ||
		author.length === 0
	) {
		res.status(400).json({
			status: 'error',
			message: 'Must provide a title, content and the author for this reuqest',
		});
		return;
	}

	// Find post by id, and get the index
	const post = await Post.findOne({where:{id:id,status:'active'}});

	if (!post) {
		res.status(404).json({
			status: 'error',
			message: 'Cant update post, invalid ID',
		});
		return;
	}

	// Update post and save it in the list
	await post.update({
		title:title,
		content:content,
		author:author,
	})

	// 204 - No content
	res.status(204).json({ status: 'success' });
	} catch (error) {
		console.log(error)
	}
	
	
};

// Update post (patch)
exports.updatePostPatch = catchAsync(async (req, res, next) => {

		const { id } = req.params;
	const data = filterObj(req.body, 'title', 'content', 'author');

	const post = await Post.findOne({where:{id:id,status:'active'}})

	if (!post) {
		return next(new AppError(404,'Cant update post, invalid ID'));
	}

	await post.update({...data})

	res.status(204).json({ status: 'success' });
})

// Delete post
exports.deletePost = catchAsync(async (req, res, next) => {
	
		const { id } = req.params;

		// Find post index, by the given id
		const post = await Post.findOne({where:{id:id,status:'active'}});
	
		if (!post) {
			return next(new AppError(404,'Cant delete post, invalid ID'));
		}
	
		// Use splice to delete post
		// await post.destroy()
		await post.update({status:'deleated'})
	
		res.status(204).json({ status: 'success' });
})