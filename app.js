const express = require('express');
const path = require('path'); // path lets us navigate the firs system
const hbs = require("hbs");// data bonding

//require the sql connection
const sql = require('./utils/sql');
// heroky assigns a port it deploys via process (environment variables - coming)
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

  res.render("home", { message: "hi there!", anothermessage: "This is easy!"});
  //res.sendFile(path.join(__dirname + '/views/index.html'));

})

app.get('/contact', (req,res) => {
  console.log('at the cont route')
  //res.sendFile(path.join(__dirname + '/views/contact.html'));
  res.render('contact', { message: "whats your name!"})

})

app.get('/users', (req,res) => {
  console.log('at the users route');

  sql.getConnection((err, connection) => {
    if(err){
      return console.log(err.message);
      
    }

    let query = `SELECT * FROM tbl_card`;
    sql.query(query, (err, rows) =>{
      connection.release();

      if (err) {
        return console.log(err.message)
      }

      console.log(rows);
      res.render('user', rows[0]);
    })
  })
})
  


app.get('/portfolio', (req,res) => {
  console.log('at the port route')
  res.send('on the portfolio page');

})

app.listen(port, () => {
  console.log(`Server running at ${port}/`);
});