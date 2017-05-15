import DishesController from '../controllers/dishes'

export default(app) => {
  const dishesController = new DishesController()

  app.route('/dishes')
    .get((req, res) => {
    	res.render('views/dishes')
    })
    .post((req, res) => {
      dishesController.add(req.body)
        .then(result => res.json(result))
        .catch(error => {
          console.log(error)
          res.send(error).status(500).end()
        })
    })

  app.route('/dishes/:id')
    .get((req, res) => {
      dishesController.getById(req.params)
        .then(result => res.json(result))
        .catch(error => {
          console.log(error)
          res.send(error).status(500).end()
        })
    })
    .put((req, res) => {
      dishesController.update(req.body, req.params)
        .then(result => res.json(result))
        .catch(error => {
          console.log(error)
          res.send(error).status(500).end()
        })
    })
    .delete((req, res) => {
      dishesController.delete(req.params)
        .then(result => res.json(result))
        .catch(error => {
          console.log(error)
          res.send(error).status(500).end()
        })
    })

  app.route('/dishes_data')
    .get((req, res) => {
      dishesController.getAll()
        .then(result => res.json(result))
        .catch(error => {
          console.log(error)
          res.send(error).status(500).end()
        })
    })
}
