const express = require('express');

const {
    getAllcomments,
    getcommentById,
    createComment,
} = require('../controllers/comment.controller');

const router = express.Router();

router.get('/',getAllcomments);

router.get('/:id',getcommentById);

router.post('/', createComment);

module.exports = {commentRouter:router};