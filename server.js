const express = require('express');
const app = express();

const path = require('path');
app.use(express.static(path.join(__dirname, 'public')));

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const mysql = require('mysql');
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'konyvesbolt2'
});

connection.connect();

app.get('/', function (req, res) {
    res.send(path.join('public/index.html'));
});

app.get('/vasarlo', function (req, res) {
    let sql = 'SELECT * FROM `vasarlo`';
    connection.query(sql, function (err, rows) {
        res.send(rows);
    })
    console.log('Összes vásárló');
})
app.post('/vasarlo/:id', function (req, res) {
    let sql = 'INSERT INTO vasarlo (vasarloid, nev, email_cim, felhasznalonev, jelszo) VALUES (?, ?, ?,?,?)';
    let values = [req.body.vasarloid, req.body.nev, req.body.emailcim, req.body.felhasznalonev, req.body.jelszo];
    connection.query(sql, values, function (err, rows) {
        if (err) {
            console.log(err);
            res.status(500).send('Internal Server Error');
        } else {
            res.send(rows);
        }
    })
    console.log(req.body)
})


app.delete('/vasarlo/', function (req, res) {
    let sql = 'DELETE FROM `vasarlo` where nev = ' + req.params.nev;
    connection.query(sql, function (err, rows) {
        res.send(rows);
    })
    console.log(req.params)
})
app.listen(3000, ()=>{
    console.log('listening on port 3000')
})

