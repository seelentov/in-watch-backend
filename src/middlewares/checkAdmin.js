import jwt from 'jsonwebtoken'
import CONFIG from '../config/config.js'

export default (req, res, next) => {
	const token = (req.headers.authorization || '')?.replace(/Bearer\s?/, '')
	if (token) {
		try {
			const decoded = jwt.verify(token, CONFIG.secretJWT)

			req.userId = decoded._id

			next()
		} catch (error) {
			console.log(error)
			return res.status(403).json({
				message: 'Нет доступа',
			})
		}
	} else {
    console.log(error)
		return res.status(403).json({
			message: 'Нет доступа',
		})

	}
}
