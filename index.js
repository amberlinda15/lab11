const express = require('express')
const app = express();
const parser = require('body-parser')
const mysql = require('mysql2')
const port = 3000;
app.use(parser.json())
const connection = mysql.createConnection({
    host: "127.0.0.1",
    user: "root",
    password: "fuck@rest123",
    database:"time_planning"
  });
  
  connection.connect(function(err) {
        if (err) throw err;
        console.log("Connected!");
        
  });

  app.listen(port,() => console.log("server started..."));

  app.get("/teammembers",(req,res) => {
        const sql = "SELECT * FROM teammembers"
        connection.query(sql,(err,rows,fields) => {
            if(!err){
                res.send(rows)
            }else{
                console.log("Error")
            } 
        })
  })

  app.get("/teammembers/:id",(req,res) => {
    const sql = "SELECT * FROM teammembers WHERE member_id=?"
    connection.query(sql,[req.params.id],(err,rows,fields) => {
        if(!err){
            res.send(rows)
        }else{
            console.log("Error")
        } 
    })
})

app.get('/add',(req,res) => {
    const json = {"member_id":52,"team_id":15,"first_name":"amber","last_name":"linda","mobile_number":"8564785621","email":"amberlinda@gmail.com","gender":"male"};
    const sql = 'INSERT INTO teammembers set ?'
    connection.query(sql,json,(err,result) => {
        if(err) throw err
        else res.send("record added");
    })
})

app.get('/update/:id',(req,res) => {
    const name = 'abhishek'
    const sql = `UPDATE teammembers SET first_name=${name} WHERE member_id=?`
    connection.query(sql,[req.params.id],(err,result) => {
        if(err) throw err
        else res.send("record updated");
    })
})

app.get('/delete/:id',(req,res) => {
    const name = 'abhishek'
    const sql = `DELETE FROM teammembers WHERE member_id=?`
    connection.query(sql,[req.params.id],(err,result) => {
        if(err) throw err
        else res.send("record updated");
    })
})