const jwt = require('jsonwebtoken');
const { getUserById } = require('../db');
const { JWT_SECRET } = process.env;

const express = require('express');
const apiRouter = express.Router();

// set `req.user` if possible
apiRouter.use(async (req, res, next) => {
  const prefix = 'Bearer ';
  const auth = req.header('Authorization');

  if (!auth) { // nothing to see here
    next();
  } else if (auth.startsWith(prefix)) {
    const token = auth.slice(prefix.length);

    try {
      const { id } = jwt.verify(token, JWT_SECRET);

      if (id) {
        req.user = await getUserById(id);
        next();
      }
    } catch ({ name, message }) {
      next({ name, message });
    }
  } else {
    next({
      name: 'AuthorizationHeaderError',
      message: `Authorization token must start with ${ prefix }`
    });
  }
});

// const express = require('express');
// const apiRouter = express.Router();

apiRouter.use((req, res, next) => {
    if (req.user) {
      console.log("User is set:", req.user);
    }
  
    next();
  });

const usersRouter = require('./users');
apiRouter.use('/users', usersRouter);

const postRouter = require('./posts');
apiRouter.use('/posts', postRouter);

const tagRouter = require('./tags');
apiRouter.use('/tags', tagRouter);

apiRouter.use((error, req, res, next) => {
    res.send(error);
  });

module.exports = apiRouter;