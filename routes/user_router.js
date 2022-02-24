const express = require ('express');
const UserController = require('../controllers/user_controller')

const upload = require('../middlewares/upload')

const route = express.Router();
route.post('/',UserController.createUser)
route.delete('/:id',UserController.deleteUser)
route.put('/:id',UserController.updateUser)
route.get('/readname',UserController.getByName)
route.get('/',UserController.getAll)
route.get('/:id',UserController.getById)
route.put('/uploadavatar/:id', upload.single('avatar'), UserController.uploadAvatar)
module.exports = route