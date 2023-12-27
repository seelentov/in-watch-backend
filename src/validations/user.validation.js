import { body } from 'express-validator'
import UserModel from '../models/User.js'

export const registerValidation = [
	body('email')
		.isEmail()
		.withMessage('Неверный формат почты')
		.custom(async value => {
			const user = await UserModel.findOne({ email: value })
			if (user) {
				throw new Error("Пользователь с таким E-mail уже существует")
			}
		}),
	body('password')
		.isLength({ min: 6 })
		.withMessage('Пароль должен быть более 5-ти символов'),
	body('login').isLength({ min: 3 }).withMessage('Введите корректный логин'),
	body('avatarUrl')
		.optional()
]

export const loginValidation = [
	body('email').isEmail().withMessage('Неверный формат почты'),
	body('password')
		.isLength({ min: 6 })
		.withMessage('Пароль должен быть более 5-ти символов'),
]