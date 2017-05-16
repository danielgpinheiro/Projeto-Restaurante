import Restaurant from '../models/restaurant'
import Dishes from '../models/dishes'
import HttpStatus from 'http-status'

const defaultResponse = (data, statusCode = HttpStatus.OK) => ({
  data,
  statusCode,
});

const errorResponse = (message, statusCode = HttpStatus.BAD_REQUEST) => defaultResponse({
  error: message,
}, statusCode);

class RestaurantController {
  constructor() {
    this.Restaurant = Restaurant
    this.Dishes = Dishes
  }

  getAll() {
    return Restaurant.find()
      .then(result => defaultResponse(result))
      .catch(error => errorResponse(error.message));
  }

  getById(params) {
    let id = params.id

    return Restaurant.findById(id)
      .then(result => defaultResponse(result))
      .catch(error => errorResponse(error.message));
  }

  add(data) {
    const restaurantData = new Restaurant(data)

    return restaurantData.save()
      .then(result => defaultResponse(result))
      .catch(error => errorResponse(error.message));
  }

  update(data, params) {
    let id = params.id

    let restaurantData = {
      "name": data.name,
      "timestamp": data.timestamp
    }

    return Restaurant.findByIdAndUpdate(id, restaurantData)
      .then(result => defaultResponse(result))
      .catch(error => errorResponse(error.message));
  }

  delete(params) {
    let id = params.id

    return Restaurant.remove({ "_id": id })
      .then(result => {
        defaultResponse(result)
        Dishes.findOne({ restaurant: id }).remove().exec()
      })
      .catch(error => errorResponse(error.message));
  }
}

export default RestaurantController
