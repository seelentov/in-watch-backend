import jwt from 'jsonwebtoken'
import CONFIG from '../config/config.js'

export const login = async (req, res) => {
	try {

		if (req.body.login !== CONFIG.admin.login || req.body.password !== CONFIG.admin.password) {
			return res.status(400).json({
				message: 'Неверный логин или пароль',
			})
		}

		const token = jwt.sign(
			{
				_id: CONFIG.admin.login,
			},
			CONFIG.secretJWT,
			{
				expiresIn: '1d',
			}
		)

		res.json({ token })
	} catch (err) {
		console.log(err)
		res.status(500).json({
			message: 'Неудалось авторизоваться',
		})
	}
}


export const getMe = async (req, res) => {
	try {

		res.json({ success: true })
	} catch (err) {
		console.log(err)
		res.status(500).json({
			message: 'Нет доступа',
		})
	}
}






