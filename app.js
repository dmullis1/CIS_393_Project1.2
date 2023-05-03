var express = require('express');
 
var app = express();

var mysql = require('mysql'); 

app.set("view engine", "ejs");

var bodyparser = require("body-parser");
app.use(bodyparser.urlencoded({ extended: true }));

var con = mysql.createConnection({
  host     : 'localhost',
  user     : 'root', 
  database : 'boardgame'
});


app.get("/home", function(req, res)
{
 con.query(q, function (error, results) {
 if (error) throw error;
 res.render("Board Game Tracker",{data: results[0].count}); 
 });
});



    app.get("/display", function(req, res) {
        var q = "select * from boardgame";
        con.query(q, function(error, results) {
        if (error) throw error;
        res.render("displayboardgame", { data: results });
        });
        });
        app.post("/updaterating", function(req, res) {
          var std_GameName = req.body.std_GameName;
          var std_Rating = req.body.std_Rating;
          var q = "update boardgame set Rating = " + std_Rating +" where GameName = " + std_GameName;
          con.query(q, function(error, results) {
          if (error) throw error;
          res.redirect("/update");
          });
      }); 
  
      app.get("/update", function(req, res){
          var q = 'SELECT COUNT(*) as count FROM boardgame';
          con.query(q, function (error, results) {
          if (error) throw error;
          res.render("updateboardgame",{count: results[0].count});
          }); 
      });

      app.post("/addboardgame", function(req, res) {
        var std_GameName = req.body.std_GameName;
        var std_LikeOrDislike = req.body.std_LikeOrDislike;
        var std_Summary = req.body.std_Summary;
        var std_Rating = req.body.std_Rating;
        var boardgame_info = { GameName: std_GameName, LikeOrDislike: std_LikeOrDislike, Summary: std_Summary, Rating: std_Rating}; 
        var q = "insert into boardgame set ?";
        con.query(q, boardgame_info, function(error, results) {
        if (error) throw error;
        res.redirect("/");
        });
    });
    
    app.get("/", function(req, res){
        var q = 'SELECT COUNT(*) as count FROM boardgame';
        con.query(q, function (error, results) {
        if (error) throw error;
        res.render("addboardgame",{count: results[0].count});
        });//query 
    });//get

      app.post("/deletestd", function(req, res) {
        var std_id = req.body.std_GameName;
        var q = "delete from boardgame where GameName = " + std_GameName;
        con.query(q, function(error, results) {
        if (error) throw error;
        res.redirect("/delete");
        });
    }); 

    app.get("/delete", function(req, res){
        var q = 'SELECT COUNT(*) as count FROM boardgame';
        con.query(q, function (error, results) {
        if (error) throw error;
        res.render("deleteboardgame",{count: results[0].count});
        }); 
    });


app.listen(8080, function () {
    console.log('App listening on port 8080!');
   });

con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
    });