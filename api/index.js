const express = require('express');
const apiRouter = express.Router();

const usersRouter = require('./users');
apiRouter.use('/users', usersRouter);

const postRouter = require('./posts');
apiRouter.use('/posts', postRouter);

const tagRouter = require('./tags');
apiRouter.use('/tags', tagRouter);

module.exports = apiRouter;