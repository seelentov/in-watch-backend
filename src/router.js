import AdminController from './controllers/AdminController.js'
import MovieController from './controllers/MovieController.js'
import UserController from './controllers/UserController.js'

import checkAuth from './middlewares/checkAuth.js'
import handleValidationErrors from './middlewares/handleValidationErrors.js'
import {
  loginValidation,
  registerValidation,
} from './validations/user.validation.js'

import Router from 'express'

const router = new Router();

router.post('/auth/signup',
registerValidation,
handleValidationErrors,
UserController.register, 
)
// USER
router.post('/auth/login',
loginValidation,
handleValidationErrors,
UserController.login,
)

router.get('/auth/me',
checkAuth, 
UserController.getMe
)
//app.patch(
//  PATH.ME,
//  checkAuth,
//  handleValidationErrors,
//  UserController.update,
//);

//ADMIN
//router.post('/admin/login',AdminController.login)

//MOVIES
router.get('/movies', MovieController.getAllbyFilter);
router.get('/movies/:id', MovieController.getOne );

export default router