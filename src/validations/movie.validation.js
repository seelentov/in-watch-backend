import { body } from 'express-validator'

export const postMovieValidation = [
	body('name')
    .isLength({ min: 2 })
		.isString()
		.withMessage('Введите название фильма'),
	body('poster')
    .isLength({ min: 2 })
		.isString()
		.withMessage('Фильм должен содержать постер'),
  body('backdrop')
    .isLength({ min: 2 })
		.isString()
		.withMessage('Фильм должен содержать изображение для баннера внутренней страницы'),
  body('year')
    .isNumeric()
		.withMessage('Введите год фильма'),
  body('description')
    .isString()
		.optional()
    .withMessage('description должно быть string'),
  body('ageRating')
    .isNumeric()
		.withMessage('Введите возрастной рейтинг фильма'),
  body('genres')
    .isLength({ min: 1 })
		.isArray()
		.withMessage('Выберите жанры фильма'),
  body('trailer')
    .isLength({ min: 2 })
		.isString()
		.withMessage('Добавьте трейлер к фильму'),
  body('country')
    .isLength({ min: 2 })
		.isString()
		.withMessage('Выберите страну'),
  body('showInBanner')
		.isBoolean()
    .optional()
		.withMessage('showInBanner должно быть boolean'),
  body('likes')
		.isNumeric()
    .optional()
		.withMessage('likes должно быть boolean'),
  body('views')
		.isNumeric()
    .optional()
		.withMessage('views должно быть boolean'),
  body('viewsMonth')
		.isNumeric()
    .optional()
		.withMessage('viewsMonth должно быть boolean'),
  body('movieLength')
		.isNumeric()
		.withMessage('movieLength должно быть numeric'),
  body('rating')
		.isNumeric()
		.withMessage('rating должно быть numeric'),
]