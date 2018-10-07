const express = require('express');
const path = require('path');
const sqlite3 = require('sqlite3').verbose();
const Sequelize = require('Sequelize');
const sequelize = new Sequelize('Portfolio', 'michael', null, {
    host: 'localhost',
    dialect: 'sqlite',
    storage: 'Chinook_Sqlite_AutoIncrementPKs.sqlite'
});


const app = express();

// Serve the static files from the React app
app.use(express.static(path.join(__dirname, '/client/public')));

var bodyParser = require('body-parser');
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

let db = new sqlite3.Database('Chinook_Sqlite_AutoIncrementPKs.sqlite', sqlite3.OPEN_READWRITE, (err) => {
    if (err) {
      console.error(err.message);
    }
    console.log('Connected to the chinook database.');
  });

const Developers = sequelize.define(
    'Developers',
    {
        UserId: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
        },
        FirstName: Sequelize.STRING,
        LastName: Sequelize.STRING,
        UserName: Sequelize.STRING,
        Email: Sequelize.STRING,
        Phone: Sequelize.STRING,
        GitHubHandle: Sequelize.STRING
    },
    {
        freezeTableName: true,
        timestamps: false
    }
);

// An api endpoint that returns a short list of items
//app.get('/api/getList', (req,res) => {
app.get('/api/users', (req,res) => {
    Developers.findAll()
    .then(users => {res.json(users)})
    /*Developers.findAll({
        where: {
            UserId: parseInt(req.params.userId)
        }
    }).then(list => {res.json(list),
    console.log(res.json(list))});
    /*
    var list = ["item1", "item2", "item3"];
    res.json(list);
    */
    console.log('Sent list of items');
});

db.close();

// Handles any requests that don't match the ones above
app.get('*', (req,res) =>{
    res.sendFile(path.join(__dirname+'/client/public/index.html'));
});

const port = process.env.PORT || 5000;
app.listen(port);

console.log('App is listening on port ' + port);