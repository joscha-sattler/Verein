
var express = require('express');
var path = require('path');
var mysql = require('mysql');
var bodyParser = require("body-parser");
const multer  = require('multer');

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));


let MIME_TYPE_MAP = {
  'image/png': 'png',
  'image/jpeg': 'jpg',
  'image/jpg': 'jpg'
}

//verarbeitung von Files

const storage = multer.diskStorage({
  destination: (req, file, cb) => {  //cb für callback
    const isValid = MIME_TYPE_MAP[file.mimetype]; //null, wenn es kein jpg/png ist
    let error = new Error("Invalid mime type");
    if (isValid) {
      error = null;
    }
    cb(error, "src/assets");
  },
  filename: (req, file, cb) => {
    const name = file.originalname
    const ext = MIME_TYPE_MAP[file.mimetype];
    cb(null, name);
  }
});

const upload = multer({ storage: storage});

// damit verschiedene Host interagieren können

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, PUT, DELETE, OPTIONS");

  next();
});

// create Connection zu MySQL

var con = mysql.createConnection({
  host     : 'localhost',
  port     : '3306',
  user     : 'root',
  password : 'MAmeisenjo2020!',
  database : 'bt4embsen'
});

// Connect

con.connect((err) => {
  if(err) {
    console.log("Verbindung zu MySQL fehlgeschlagen");
    throw err;
  }
  console.log("Verbindung zu MySQL hergestellt");
});


// POST - METHODEN ------------------------------------------------------------------------- //

// TTSpieler in DB speichern

app.post('/erstelleSpieler', (req, res) => {

  let neuerTTSpieler = {
    ganzername:   req.body.datenDesNeuenSpielers.ganzername,
    lebensjahr:   req.body.datenDesNeuenSpielers.lebensjahr,
    qttr:         req.body.datenDesNeuenSpielers.qttr,
    mannschaft:   req.body.datenDesNeuenSpielers.mannschaft,
    bildpfad:     req.body.datenDesNeuenSpielers.bildpfad,
  }

  let sql = 'INSERT INTO ttspieler SET ?';

  con.query(sql, neuerTTSpieler, (err, result) => {
    if (err) {
      console.log("Datenbank-Speicherung fehlgeschlagen!");
      throw err;
    }
    console.log(result);
    res.send('Benutzer angelegt');
  });
})

// lokales hochladen des ausgewählten Bildes

app.post('/upload', upload.single("myFile"), (req, res, next) => {
  try {
    return res.status(201).json({
      message: 'File uploded successfully'
    });
  } catch (error) {
    console.error(error);
  }
});


// GET - METHODEN ------------------------------------------------------------------------- //

// Einen einzelnen TTSpieler abrufen

app.get('/bekommeEinenSpieler/:spielerid', (req, res) => {

  let sql = `SELECT * FROM ttspieler WHERE spielerid = ${req.params.spielerid} `;

  con.query(sql, (err, result) => {
    if (err) {
      console.log("Abrufen der Daten aus der Datenbank fehlgeschlagen!");
      throw err;
    }
    // console.log('Erfolgreich Daten aus der Datenbank abgerufen')
    // console.log(result);
    res.send(result);
  });
})

// TTSpieler abrufen

app.get('/bekommeSpieler', (req, res) => {

  let sql = 'SELECT * FROM ttspieler ';

  con.query(sql, (err, result) => {
    if (err) {
      console.log("Abrufen der Daten aus der Datenbank fehlgeschlagen!");
      throw err;
    }
    // console.log('Erfolgreich Daten aus der Datenbank abgerufen')
    // console.log(result);
    res.send(result);
  });
})

// Eine ganze Mannschaft abrufen

app.get('/bekommeSpieler/:mannschaft', (req, res) => {

  let sql = 'SELECT * FROM ttspieler where mannschaft = ? ';

  const vlaues = [req.params.mannschaft];

  con.query(sql, vlaues, (err, result) => {
    if (err) {
      console.log("Abrufen der Daten aus der Datenbank fehlgeschlagen!");
      throw err;
    }
    console.log('Erfolgreich Daten aus der Datenbank abgerufen')
    // console.log(result);
    res.send(result);
  });
})


// PATCH - METHODEN ---------------------------------------------------------------------- //

// TTSpieler in DB bearbeiten

app.patch('/bearbeiten/:spielerid', (req, res) => {

  const sql = `UPDATE ttspieler SET ? WHERE spielerid = ${req.body.datenDesBearbeitetenSpielers.spielerid}`;

  let bearbeiteterTTSpieler = {
    ganzername:   req.body.datenDesBearbeitetenSpielers.ganzername,
    lebensjahr:   req.body.datenDesBearbeitetenSpielers.lebensjahr,
    qttr:         req.body.datenDesBearbeitetenSpielers.qttr,
    mannschaft:   req.body.datenDesBearbeitetenSpielers.mannschaft,
    bildpfad:     req.body.datenDesBearbeitetenSpielers.bildpfad,
  }

  con.query(sql, bearbeiteterTTSpieler, (err, result) => {
    if (err) {
      console.log("Spieler-bearbeiten fehlgeschlagen!");
      throw err;
    }
    console.log(result);
    res.send('Spieler bearbeitet');
  });
})


// DELETE - METHODEN ---------------------------------------------------------------------- //

// TTSpieler in DB löschen

app.delete('/loescheSpieler/:spielerid', (req, res) => {

  const sql = `DELETE FROM ttspieler WHERE spielerid = ${req.params.spielerid}`;

  con.query(sql, (err, result) => {
    if (err) {
      console.log("Spieler-Löschung fehlgeschlagen!");
      throw err;
    }
    console.log(result);
    res.send('Benutzer gelöscht');
  });
})

// Alle TTSpieler löschen

app.delete('/loescheSpieler', (req, res) => {

  const sql = 'DELETE FROM ttspieler';

  con.query(sql, (err, result) => {
    if (err) {
      console.log("Spieler-Löschung fehlgeschlagen!");
      throw err;
    }
    console.log(result);
    res.send('Spieler gelöscht');
  });
})


// Als Arrow-Function

app.listen( 3000, () => console.log('App lauscht auf Port 3000') );
