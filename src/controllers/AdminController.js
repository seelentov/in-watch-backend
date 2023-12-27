import AdminService from '../services/AdminService.js'

class AdminController{
  //async login(req, res) {
  //  try {
  //    const token = await AdminService.login({
  //      login: req.body.login,
  //      password: req.body.password
  //    })
  //    res.json({ token })
  //  } catch (err) {
  //    console.log(err)
  //    res.status(500).json({
  //      message: 'Неудалось авторизоваться',
  //    })
  //  }
  //}
}

export default new AdminController()





