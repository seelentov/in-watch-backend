import AdminService from '../services/AdminService.js'

class AdminController{
  async login(req, res) {
    try {
      const token = await AdminService.login({
        login: req.body.login,
        password: req.body.password
      })
      res.json({ token })
    } catch (err) {
      return res.status(err.status || 500).json({
        message: err.message || 'Нет доступа',
      })
    }
  }
}

export default new AdminController()





