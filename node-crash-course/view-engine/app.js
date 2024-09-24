const express = require("express")

const app = express();

app.set('view engine', 'ejs')


app.listen(5000, ()=> console.log("App running on port 5000"))

app.get('/', (req,res) =>{
    res.render('index')
})