import express from 'express';
import mysql2 from 'mysql2';
const app = express()
const conn = mysql2.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    port: 3333,
    database: 'store_db'
})
const hostname = '127.0.0.1';
const port = 3000;

conn.connect( err => {
    if(err){
        console.error('Database is disconnect!');
        console.error(err);
    }
    else {
        console.log('Database is connected!')
    }
});

app.get('/api/products', (req, res) => {
    let sql = 'SELECT * FROM `products`;';
    let query = conn.query(sql, (err, results) => {
        res.json(
            {
            "status" : res.statusCode,
            "error" : err, 
            "response" : results
        }
        );
    })
});

app.get('/api/product/:id', (req, res) => {
    let sql = "SELECT * FROM `products` WHERE product_id='"+req.params.id+"'"
    let query = conn.query(sql, (err, results) => {
        res.json(
            {
                "status" : res.statusCode,
                "error" : err, 
                "response" : results
            }
        )
    })
})


app.listen(port, () => {
    console.log(`Server running at ${hostname}:${port}`)
})