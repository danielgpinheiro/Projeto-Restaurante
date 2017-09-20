import HomeController from '../controllers/home'

export default(app) => {
  const homeController = new HomeController()

  app.route('/')
    .get((req, res) => {
    	res.render('views/home')
    })

  app.route('/user')
    .post((req, res) => {
      homeController.add(req.body)
        .then(result => res.json(result))
        .catch(error => {
          console.log(error)
          res.send(error).status(500).end()
        })
    })

  app.route('/login')
    .post((req, res) => {
      homeController.login(req)
        .then(result => res.json(result))
        .catch(error => {
          console.log(error)
          res.send(error).status(500).end()
        })
    })

  app.route('/user/:id')
    .get((req, res) => {
      homeController.getById(req.params)
        .then(result => res.json(result))
        .catch(error => {
          console.log(error)
          res.send(error).status(500).end()
        })
    })
}
