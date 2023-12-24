import cors from 'cors'
import express from 'express'
import mongoose from 'mongoose'
import CONFIG from './config/config.js'
import PATH from './config/path.config.js'

import * as AdminController from './controllers/AdminController.js'
import * as MovieController from './controllers/MovieController.js'
import * as UserController from './controllers/UserController.js'

import checkAuth from './middlewares/checkAuth.js'
import handleValidationErrors from './middlewares/handleValidationErrors.js'
import {
  loginValidation,
  registerValidation,
} from './validations/user.validation.js'

mongoose
  .connect(CONFIG.mongooseConnectionString)
  .then(() => {
    console.log('MongoDB OK');
  })
  .catch((err) => {
    console.log(`MongoDB ERR: ${err}`);
  });

const app = express();

app.use(cors(CONFIG.cors));
app.use(express.json());

app.use('/uploads', express.static('uploads'))

// USER
app.post(
  PATH.SIGNUP,
  registerValidation,
  handleValidationErrors,
  UserController.register,
);
app.post(
  PATH.LOGIN,
  loginValidation,
  handleValidationErrors,
  UserController.login,
);
app.get(PATH.ME, checkAuth, UserController.getMe);
//app.patch(
//  PATH.ME,
//  checkAuth,
//  handleValidationErrors,
//  UserController.update,
//);

//ADMIN
app.post(PATH.ADMIN, AdminController.login);


//MOVIES
app.get(PATH.MOVIES, MovieController.getAllbyFilter);
app.get(PATH.MOVIES + '/:id', MovieController.getOne );


app.listen(CONFIG.port, (err) => {
  if (err) {
    return console.log(`Server ERR: ${err}`);
  }
  return console.log('Server OK');
});
