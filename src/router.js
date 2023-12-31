import MovieController from './controllers/MovieController.js'
import UserController from './controllers/UserController.js'
import AdminController from './controllers/AdminController.js'

import checkAuth from './middlewares/checkAuth.js'
import checkAdmin from './middlewares/checkAdmin.js'
import handleValidationErrors from './middlewares/handleValidationErrors.js'
import {
  loginValidation,
  registerValidation,
  updateInfoValidation,
  changePassValidation
} from './validations/user.validation.js'


import {
  postMovieValidation
} from './validations/movie.validation.js'

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

router.get('/auth/favorite',
checkAuth, 
UserController.getFavorites
)

router.get('/auth/receit',
checkAuth, 
UserController.getReceit
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

router.patch('/auth/changeimage',
checkAuth,
UserController.changeAvatar
)

router.get('/auth/me',
checkAuth, 
UserController.getMe
)

//ADMIN
router.post('/admin/login',
AdminController.login
)

//MOVIES
router.get('/movies', 
MovieController.getAllbyFilter
);
router.get('/movies/:id', 
MovieController.getOne 
);
router.post('/movies/',
postMovieValidation, 
handleValidationErrors, 
checkAdmin, 
MovieController.getOne 
);
router.patch('/movies/:id',
postMovieValidation, 
handleValidationErrors, 
checkAdmin, 
MovieController.getOne 
);
router.delete('/movies/:id',
checkAdmin, 
MovieController.getOne 
);

export default router