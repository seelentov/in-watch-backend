import MovieController from './controllers/MovieController.js'
import UserController from './controllers/UserController.js'

import checkAuth from './middlewares/checkAuth.js'
import handleValidationErrors from './middlewares/handleValidationErrors.js'
import {
  loginValidation,
  registerValidation,
  updateInfoValidation,
  changePassValidation
} from './validations/user.validation.js'

import Router from 'express'

const router = new Router();

// USER
router.post('/auth/signup',
registerValidation,
handleValidationErrors,
UserController.register, 
)

router.post('/auth/login',
loginValidation,
handleValidationErrors,
UserController.login,
)

router.patch('/auth/favorite', 
checkAuth,
UserController.updateFav
)

router.patch('/auth/info',
updateInfoValidation,
handleValidationErrors, 
checkAuth,
UserController.updateInfo
)

router.patch('/auth/changepass',
changePassValidation,
handleValidationErrors, 
checkAuth,
UserController.changePass
)

router.get('/auth/me',
checkAuth, 
UserController.getMe
)
//app.patch(
//  PATH.ME,
//  checkAuth,
//  handleValidationErrors,
//  UserController.updateFav,
//);

//ADMIN
//router.post('/admin/login',AdminController.login)

//MOVIES
router.get('/movies', MovieController.getAllbyFilter);
router.get('/movies/:id', MovieController.getOne );

export default router