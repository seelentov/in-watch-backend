import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import CONFIG from '../config/config.js'
import PATH from '../config/path.config.js'
import UserModel from '../models/User.js'
import UserService from '../services/UserService.js'
class UserController{
  async register(req, res){
    try {
      const user = await UserService.register(req.body)
  
      res.json(user)
    } catch (err) {
      console.log(err)
      res.status(500).json({
        message: 'Не удалось зарегистрироваться',
      })
    }
  }
  
  async login (req, res) {
    try {
      const user = await UserService.login(req.body)
  
      res.json(user)
    } catch (err) {
      console.log(err)
      res.status(500).json({
        message: 'Неудалось авторизоваться',
      })
    }
  }
  
  async getMe (req, res) {
    try {
      const user = await UserService.getMe(req.userId)
  
      res.json(user)
    } catch (err) {
      console.log(err)
      return res.status(500).json({
        message: 'Нет доступа',
      })
    }
  }
  
  
  //async update (req, res) {
  //  try {
  //    const user = await UserModel.findByIdAndUpdate(req.userId, {
  //      avatarUrl: req.body.avatarUrl,
  //      login: req.body.login,
  //    }, {
  //      new: true
  //    })
  
  //    if (!user) {
  //      return res.status(404).json({
  //        message: 'Пользователь не найден',
  //      })
  //    }
  
  //    const { passwordHash, ...userData } = user._doc
  
  //    res.json(userData)
  //  } catch (err) {
  //    console.log(err)
  //    return res.status(500).json({
  //      message: 'Нет доступа',
  //    })
  //  }
  //}
}

export default new UserController()


