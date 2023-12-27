import jwt from 'jsonwebtoken'
import CONFIG from '../config/config.js'

class AdminService{
  //async login({login, password}){
  //  if (login !== CONFIG.admin.login || password !== CONFIG.admin.password) {
  //    throw new Error('Неверный логин или пароль')
  //  }

  //  const token = jwt.sign(
  //    {
  //      _id: login,
  //    },
  //    CONFIG.secretJWT,
  //    {
  //      expiresIn: '1d',
  //    }
  //  )

  //  return token
  //}
}

export default new AdminService()