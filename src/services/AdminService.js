import jwt from 'jsonwebtoken'
import CONFIG from '../config/config.js'

class AdminService{
  async login({login, password}){
    if (login !== CONFIG.admin.login || password !== CONFIG.admin.password) {
      const error = new Error('Неверный логин или пароль');
        error.status = 420; 
        throw error; 
    }

    const token = jwt.sign(
      {
        key: CONFIG.admin.secretKey,
      },
      CONFIG.secretJWT,
      {
        expiresIn: '1d',
      }
    )

    return token
  }
}

export default new AdminService()