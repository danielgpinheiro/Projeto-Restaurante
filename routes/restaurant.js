import RestaurantController from '../controllers/restaurant'
import CircularJson from 'circular-json'

export default(app) => {
  const restaurantController = new RestaurantController()

  app.route('/restaurant')
    .get((req, res) => {
    	res.render('views/restaurant')
    })
    .post((req, res) => {
      restaurantController.add(req.body)
        .then(result => res.json(result))
        .catch(error => {
          console.log(error)
          res.send(error).status(500).end()
        })
    })

  app.route('/restaurant/:id')
    .get((req, res) => {
      restaurantController.getById(req.params)
        .then(result => res.json(result))
        .catch(error => {
          console.log(error)
          res.send(error).status(500).end()
        })
    })
    .put((req, res) => {
      restaurantController.update(req.body, req.params)
        .then(result => res.json(result))
        .catch(error => {
          console.log(error)
          res.send(error).status(500).end()
        })
    })

  app.route('/restaurant_data')
    .get((req, res) => {
      restaurantController.getAll()
        .then(result => res.json(result))
        .catch(error => {
          console.log(error)
          res.send(error).status(500).end()
        })
    })
}
