var express = require("express")

var port = process.env.PORT || 3000;

//Initialize Express
var app     = express()

//Frontend dependencies
var stylus = require('stylus')
var nib = require('nib')

//Stylus+nib compile
function compile(str, path) {
  return stylus(str)
    .set('filename', path)
    .use(nib());
}
//View engine
app.set('view engine', 'pug');

//Public stylesheets and scripts
app.use(stylus.middleware(
  { src: __dirname + '/public'
  , compile: compile
  }
));
app.use(express.static(__dirname + '/public'))

app.get('/', (req, res) => {
  res.render('index')
})

app.listen(port)

console.log("Fired on port 3000.")
exports = module.exports = app;
