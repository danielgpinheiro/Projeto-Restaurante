import Dishes from '../models/dishes'
import HttpStatus from 'http-status'

const defaultResponse = (data, statusCode = HttpStatus.OK) => ({
  data,
  statusCode,
});

const errorResponse = (message, statusCode = HttpStatus.BAD_REQUEST) => defaultResponse({
  error: message,
}, statusCode);

class DishesController {
  constructor() {
    this.Dishes = Dishes
  }

  getAll() {
    return Dishes.find().populate('restaurant')
      .then(result => defaultResponse(result))
      .catch(error => errorResponse(error.message));
  }

  getById(params) {
    let id = params.id

    return Dishes.findById(id).populate('restaurant')
      .then(result => defaultResponse(result))
      .catch(error => errorResponse(error.message));
  }

  add(data) {
    const dishesData = new Dishes(data)

    return dishesData.save()
      .then(result => defaultResponse(result))
      .catch(error => errorResponse(error.message));
  }

  update(data, params) {
    let id = params.id

    let dishesData = {
      "name": data.name,
      "price": data.price,
      "timestamp": data.timestamp,
      "restaurant": {
        "_id": data.restaurant._id
      }
    }

    return Dishes.findByIdAndUpdate(id, dishesData)
      .then(result => defaultResponse(result))
      .catch(error => errorResponse(error.message));
  }

  delete(params) {
    let id = params.id

    return Dishes.remove({ "_id": id })
      .then(result => defaultResponse(result))
      .catch(error => errorResponse(error.message));
  }
}

export default DishesController
