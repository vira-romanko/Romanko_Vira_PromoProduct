const createError = require('http-errors');
const express = require('express');
const path = require('path'); // path lets us navigate the firs system
const hbs = require("hbs");// data bonding




// heroku assigns a port it deploys via process (environment variables - coming)
// locally this  run @ port 3000; remotley it'll
const port = process.env.PORT || 3000; //a double pipe - ||-  means or

const app = express();
app.use (express.static('public'));//css and js files
// tell express to use the handlebars engine to render data
app.set('view engine', 'hbs');
// tell express to use the views folder to find its templates
app.set('views', __dirname + "/views");



app.get ('/', (red, res) => {
  console.log('at the home route')

  res.render("index");
  //res.sendFile(path.join(__dirname + '/views/index.html'));

})


// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
  });
  
  // error handler goes here
  app.use(function(err, req, res, next) {
    //  only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
  
    // render the error page
    res.status(err.status || 500);
    res.render('error');
  });

app.listen(port, () => {
  console.log(`Server running at ${port}/`);
});