const express = require('express')
	http = require('http')
	app = express()
	bodyParser = require('body-parser')
	expressLayouts = require('express-ejs-layouts')

app.set('port', process.env.PORT || 8080)
app.set('views', __dirname + '/public')
app.set('view engine', 'ejs');
app.use(expressLayouts);
app.use(bodyParser.urlencoded({extended: true}))
app.use(express.static('public'))

app.get('/', (req, res) => {
  res.render('views/home');
})

app.get('/restaurant', (req, res) => {
	res.render('views/restaurant')
})

app.get('/dishes', (req, res) => {
	res.render('views/dishes')
})

http.createServer(app).listen(app.get('port'), () => {
	console.log('Express server listening on port ' + app.get('port'))
})
