import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import CONFIG from '../config/config.js'
import PATH from '../config/path.config.js'
import UserModel from '../models/User.js'

class UserService{
  async register(user){
      const password = user.password
      const salt = await bcrypt.genSalt(10)
      const hash = await bcrypt.hash(password, salt)
  
      const avatarUrl = user.avatarUrl || PATH.DEFAULT_IMG.USER
  
      const doc = new UserModel({
        email: user.email,
        login: user.login,
        passwordHash: hash,
        avatarUrl,
        role: 'user',
      })
  
      const userDoc = await doc.save()
  
      const token = jwt.sign(
        {
          _id: userDoc._id,
        },
        CONFIG.secretJWT,
        {
          expiresIn: '30d',
        }
      )
  
      const { passwordHash, ...userData } = userDoc._doc
  
      return { ...userData, token }
  }
  
  async login (user) {
      const userDoc = await UserModel.findOne({
        email: user.email,
      })
  
      if (!userDoc) {
        throw new Error('Wrong login or password')
      }
  
      const isValidPass = await bcrypt.compare(
        user.password,
        userDoc._doc.passwordHash
      )
  
      if (!isValidPass) {
        throw new Error('Wrong login or password')
      }
  
      const token = jwt.sign(
        {
          _id: userDoc._id,
        },
        CONFIG.secretJWT,
        {
          expiresIn: '30d',
        }
      )
  
      const { passwordHash, ...userData } = userDoc._doc
  
      return({ ...userData, token })

  }
  
  async getMe (userId) {

      const userDoc = await UserModel.findById(userId)
  
      if (!userDoc) {
        throw new Error('Пользователь не найден')
      }
  
      const { passwordHash, ...userData } = userDoc._doc
  
      return userData
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

export default new UserService()