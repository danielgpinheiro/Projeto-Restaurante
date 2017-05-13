export default(app) => {
  app.get('/restaurant', (req, res) => {
  	res.render('views/restaurant')
  })
}
