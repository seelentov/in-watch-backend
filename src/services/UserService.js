import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import CONFIG from '../config/config.js'
import PATH from '../config/path.config.js'
import MovieModel from '../models/Movie.js'
import UserModel from '../models/User.js'
import FileService from '../services/FileService.js'

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
        userSalt: salt
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
  
      const { passwordHash, userSalt, ...userData } = userDoc._doc
  
      return { ...userData, token }
  }
  
  async login (user) {
      const userDoc = await UserModel.findOne({
        email: user.email,
      })
  
      if (!userDoc) {
        const error = new Error('Неверный логин или пароль');
        error.status = 400; 
        throw error; 

      }
  
      const isValidPass = await bcrypt.compare(
        user.password,
        userDoc._doc.passwordHash
      )
      if (!isValidPass) {

        const error = new Error('Неверный логин или пароль');
        error.status = 400; 
        throw error; 
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
  
      const { passwordHash, userSalt, ...userData } = userDoc._doc
  
      return({ ...userData, token })

  }
  
  async getMe (userId) {
      
      const userDoc = await UserModel.findById(userId)
  
      if (!userDoc) {
        const error = new Error('Пользователь не найден');
        error.status = 400; 
        throw error; 
      }
  
      const { passwordHash, userSalt, ...userData } = userDoc._doc
  
      return userData
  }
  
  
  async updateFav (action, ids, userId) {
    let user;
      if(action === 'add'){
         user = await UserModel.findByIdAndUpdate(
          userId,
          { $addToSet: { favorites: { $each: ids } } },
          { new: true }
        )
    
        await MovieModel.updateMany(
          { _id: { $in: ids } },
          { $inc: { likes: 1 } }
        )
      } else {
         user = await UserModel.findByIdAndUpdate(
          userId,
          { $pull: { favorites: { $in: ids } } },
          { new: true }
        );
      
        await MovieModel.updateMany(
          { _id: { $in: ids } },
          { $inc: { likes: -1 } }
        );
      }
      
      if (!user) {
        const error = new Error('Пользователь не найден');
        error.status = 400; 
        throw error; 
      }
  
      const { passwordHash, userSalt, ...userData } = userDoc._doc
      return userData
  }

  async updateInfo (userId, form) {

      const user = await UserModel.findByIdAndUpdate(
        userId,
        { 
          email: form.email,
          login: form.login 
        },
        { new: true }
      )

      if (!user) {
        const error = new Error('Пользователь не найден');
        error.status = 400; 
        throw error; 
      }
          
      const { passwordHash, userSalt, ...userData } = user._doc
      return userData
  }

  async changePass (userId, form) {

    const userDoc = await UserModel.findById(userId)

    if (!userDoc) {
      const error = new Error('Неверный пароль');
      error.status = 400; 
      throw error; 
    }

    const isValidPass = await bcrypt.compare(
      form.password,
      userDoc._doc.passwordHash
    )

    if (!isValidPass) {
      const error = new Error('Неверный пароль');
      error.status = 400; 
      throw error; 
    }

    const hash = await bcrypt.hash(form.newPassword, userDoc.userSalt)
    
    await UserModel.findByIdAndUpdate(userId,{
      passwordHash: hash,
    })
    
  }

  async changeAvatarUrl (userId, image) {
    if(image.mimetype !== "image/png"){
      const error = new Error('Файл не является изображением');
      error.status = 400; 
      throw error; 
    }
    const url = await FileService.saveFile(image)
    const userDoc = await UserModel.findByIdAndUpdate(userId,
      { avatarUrl: url },
      { new: true }
      )

    return userDoc
    
  }
}

export default new UserService()