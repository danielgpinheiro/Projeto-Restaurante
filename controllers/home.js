import User from '../models/user'
import HttpStatus from 'http-status'
import mongoose from 'mongoose'

const defaultResponse = (data, statusCode = HttpStatus.OK) => ({
  data,
  statusCode,
});

const errorResponse = (message, statusCode = HttpStatus.BAD_REQUEST) => defaultResponse({
  error: message,
}, statusCode);

class HomeController {
  constructor() {
    this.User = User
  }

  teste(result) {
    console.log('d')
    return defaultResponse(result)
  }

  login(req) {
    return User.findOne({ email: req.body.params.email, pass: req.body.params.pass })
      .then(result => this.teste(result))
      .catch(error => errorResponse(error.message));
  }

  getById(params) {
    let id = params.id

    return User.findById(id)
      .then(result => defaultResponse(result))
      .catch(error => errorResponse(error.message));
  }

  add(data) {
    const userData = new User(data)

    return userData.save()
      .then(result => defaultResponse(result))
      .catch(error => errorResponse(error.message));
  }
}

export default HomeController
