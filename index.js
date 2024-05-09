const express =  require("express");
const myconnection = require("express-myconnection");
const mysql = require("mysql");
const session = require("express-session");
const bodyParser = require("body-parser");
const app =  express();
const conecttion = require("./databse/database");
const {User, Register} = require("./databse/login");
const path = require("path");
const bcrypt = require("bcrypt");
const { sequelize, DataTypes } = require("sequelize");
conecttion
    .authenticate()
    .then(()=> {
        console.log("concxão feita com o banco de dados!")
    })
    .catch((msgErro)=>{
        console.log(msgErro);
    });

app.set("views", path.join(__dirname, "views"));

app.set("view engine","ejs");

app.use(express.static(path.join(__dirname, "public")));

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());


app.get("/",(req, res) => {
    res.render("index")
});

app.get("/register.ejs",(req, res) => {
    res.render("./register")
});

app.post("/registered", async (req, res) => {
    const {name, email, date, nickname, password } = req.body;
    Register.create({
        name: name,
        email: email,
        date: date, 
        nickname: nickname,
        password: await bcrypt.hash(password, 10)
    }).then(()=> {
        res.redirect("https://google.com")
    }).catch(() =>{
        res.redirect("/register")
    })
});

app.post("/login", async(req, res) => {
    const {email_login,password_login } = req.body;
    console.log("body", req.body)
    Register.findOne({
        where: {
            email: email_login,
            password: await bcrypt.hash (password_login, 10)
            }
        }).then((consulta)=>{
            if( consulta ){
                res.redirect("http://google.com")
            }else{
                res.redirect("/");
            }
        });
    });

app.listen(3030,() => {
    console.log("app rodadno")
});