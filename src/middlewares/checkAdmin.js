import jwt from 'jsonwebtoken'
import CONFIG from '../config/config.js'

export default (req, res, next) => {
	const token = (req.headers.authorization || '')?.replace(/Bearer\s?/, '')
	if (token) {
		try {
			const decoded = jwt.verify(token, CONFIG.secretJWT)

      if(decoded.key !== CONFIG.admin.secretKey){
        const error = new Error('Нет доступа');
        error.status = 401; 
        throw error; 
      }
			req.adminKey = decoded.key
			next()
		} catch (error) {
			console.log(error)
			return res.status(403).json({
				message: 'Нет доступа',
			})
		}
	} else {
		return res.status(403).json({
			message: 'Нет доступа',
		})
	}
}