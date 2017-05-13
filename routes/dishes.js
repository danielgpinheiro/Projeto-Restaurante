export default (app) => {
  app.get('/dishes', (req, res) => {
    res.render('views/dishes')
  })
}
