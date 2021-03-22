require('dotenv').config()
const express = require("express")
const app = express()
const port = process.env.PORT

require('./startup/firebase')
require('./startup/routes')(app)
app.use(express.static(__dirname + '/public'));
app.use("/css", express.static(__dirname + '/public/css'))
app.use("/images", express.static(__dirname + '/public/images'))
app.set("views", "./views")
app.set("view engine", "ejs")
app.get('/aia-test', function (req, res) {
    res.render("index");
});
app.listen(port, () => {
    console.log(`listening port ${port}`)
})