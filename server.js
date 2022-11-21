const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const {body} = require('express-validator');
const ejsMate = require('ejs-mate');
const ExpressError = require('./utils/ExpressError');
const methodOverride = require('method-override');

const connection = mysql.createConnection({
    host : 'localhost',
    user : 'root',
    password : 'Gola2002@#!',
    database : 'movie_db'
});

connection.connect();


app.engine('ejs',ejsMate)
app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));
app.use(methodOverride('_method'));

const jsonParser = bodyParser.json()

const urlencodedParser = bodyParser.urlencoded({extended:false})

app.get('/',(req,res)=>{
    res.render('login.ejs');
})

app.get('/errorLogin',(req,res)=>{
    res.render('errorLogin.ejs');
})

app.get('/register',(req,res)=>{
        res.render('register.ejs')
})

app.get('/home',(req,res)=>{
    var passedName = req.query.user;
    res.render('home.ejs',{username:passedName})
})

app.post('/',urlencodedParser,async(req,res)=>{
    connection.query(`SELECT * FROM CUSTOMER where Username='${req.body.username}' and Password='${req.body.password}'`,function (error,results,fields) {
        if(error) throw error;
        if(results.length===0){
            res.redirect("/errorLogin")
        }
        else{
            let user_id = results[0].Cust_ID
            res.redirect(`/book_movies?user=${req.body.username}&user_id=${user_id}`)
        }
    })
});

app.post('/register',urlencodedParser,async(req,res)=>{
        cust_id = 0;
        connection.query('SELECT COUNT(*) FROM Customer', function (error, results, fields) {
            if (error) throw error;
            cust_id = results[0]['COUNT(*)']+1;
            console.log(cust_id)
            connection.query(`INSERT INTO Customer(Cust_ID,Customer_Phone,Customer_email,Customer_Fname,Customer_Lname,Username,Password,Age) VALUES (${cust_id},${req.body.phone_number},'${req.body.email}','${req.body.first_name}','${req.body.last_name}','${req.body.username}','${req.body.password}',${req.body.age})`,
            function(error,results,fields){
                if(error) throw error;
                res.redirect(`/book_movies?user=${Boolean(req.body.username)?req.body.username:'Guest'}&user_id=${cust_id}`);
        })
    });
})

app.get('/book_movies',(req,res)=>{
    connection.query('SELECT * FROM movie',function(error,results,fields){
        if(error) throw error;
        let user = req.query.user
        if(typeof(user)==="undefined")
            user = 'Guest'
        user_id = req.query.user_id
        movie_ids = []
        movie_types = []
        movie_release_dates = []
        movie_names = []
        movie_lang = []
        movie_desc = []
        movie_length = []
        image_sources = ['https://m.media-amazon.com/images/M/MV5BNTM4NjIxNmEtYWE5NS00NDczLTkyNWQtYThhNmQyZGQzMjM0XkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_FMjpg_UX1000_.jpg','https://m.media-amazon.com/images/M/MV5BNzEzOTZjYjYtMTI3MS00NWE1LWIyZTktYTRlMTBlYjlkMjZiXkEyXkFqcGdeQXVyMTUzMTg2ODkz._V1_.jpg','https://www.theilluminerdi.com/wp-content/uploads/2022/09/black-adam-heroes.jpg','https://m.media-amazon.com/images/M/MV5BZjgwNDA3MmUtMTQ3Yy00ZDFmLTgwMTktNTBlMTQ3ZTI5MjYxXkEyXkFqcGdeQXVyMTM1MTE1NDMx._V1_FMjpg_UX1000_.jpg','https://m.media-amazon.com/images/M/MV5BNDBhM2IxMzItOTdmZi00NmMzLWFlNTgtN2E2MDRjODU4NzEzXkEyXkFqcGdeQXVyODMyNTM0MjM@._V1_.jpg','https://m.media-amazon.com/images/M/MV5BMDNhMWUxMjctZWFhNy00MjUzLWE3NjYtNTE4ZjVhYjRkZThmXkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_FMjpg_UX1000_.jpg','https://m.media-amazon.com/images/M/MV5BZWY2MGIxYjMtNGRiMi00ODczLWFlZjItYzE5YTdmNzdlNDEwXkEyXkFqcGdeQXVyMTMzODk3NDU0._V1_.jpg','https://m.media-amazon.com/images/M/MV5BYTE1MmZiMWYtYTFmZi00YjA3LWI2ODgtMWFlNWYxZjdmNGE3XkEyXkFqcGdeQXVyNjk1Njg5NTA@._V1_FMjpg_UX1000_.jpg','https://www.cwfilms.jp/en/news/images/12809e7f10e8ec3c6691c5c0c1be7cc50fe00ba6.jpg','https://m.media-amazon.com/images/M/MV5BYzFmMjAwMDYtNzM0Zi00NjY2LWFjMjYtMGQ1OTRiZjk5YjJkXkEyXkFqcGdeQXVyMTMwODY5NDc2._V1_.jpg']

        results.forEach(function(arrayItem){
            movie_ids.push(arrayItem.Movie_ID)
            movie_types.push(arrayItem.Movie_Type)
            movie_release_dates.push(arrayItem.Release_date.toDateString())
            movie_names.push(arrayItem.Movie_name)
            movie_lang.push(arrayItem.Movie_Lang)
            movie_desc.push(arrayItem.Movie_Desc)
            movie_length.push(arrayItem.Movie_Length)
        })
        console.log("User Id : ",user_id);

        res.render('book_movies.ejs',{
            movie_ids:movie_ids,
            movie_ids:movie_ids,
            movie_types:movie_types,
            movie_release_dates:movie_release_dates,
            movie_names:movie_names,
            movie_lang:movie_lang,
            movie_desc:movie_desc,
            movie_length:movie_length,
            images : image_sources,
            user:user,
            user_id:user_id
        });
    })
})

app.get('/book_ticket',(req,res)=>{
    let movie_id = req.query.movie_id
    let user = req.query.user
    if(user==='Guest')
        res.redirect('/')
    else{
        connection.query(`SELECT * FROM Movie WHERE Movie_ID=${movie_id}`,function(error,results,fields){
            if (error) throw error;
            res.render('booking.ejs',{
                movie_id:movie_id,
                movie_name:results[0]['Movie_name'],
                movie_genre:results[0]['Movie_Type'],
                movie_lang:results[0]['Movie_Lang'],
                username:user
            });
        })
    }
})

app.post('/book_tickets',urlencodedParser,async(req,res)=>{
    let movie_id = req.query.movie_id
    let theatre_name = req.body.theatre_id;
    let theatre_id = 0;
    if(theatre_name==='PVR (Phoneix Marketcity)')
        theatre_id = 1;
    else if(theatre_name==='PVR-IMAX (VR Mall)')
        theatre_id = 2;
    else if(theatre_name==='Inox (Gopalan Signature Mall)')
        theatre_id = 3;
    else if(theatre_name==='PVR (Soulspace Spirit Mall)')
        theatre_id = 4;
    else
        theatre_id = 5;
    let username = req.query.username
    let user_id = 0;
    connection.query(`SELECT Cust_ID from Customer WHERE Username='${username}'`,function(error,results,fields){
        if(error) throw error;
        user_id = results[0]['Cust_ID']
        connection.query(`INSERT INTO Ticket(Movie_ID,Theatre_ID,Customer_ID,Show_Date,Show_Time,Admits,Seat_Type) VALUES (${movie_id},${theatre_id},${user_id},'${req.body.show_date}','${req.body.show_time}',${req.body.admits},'${req.body.seat_type}')`,function(error,results,fields){
            if(error) throw error;
        })
        connection.query(`UPDATE TICKET SET Total_Bill = movie_db.Calculate_Total(Admits,Seat_Type) WHERE Customer_ID=${user_id} and Movie_ID=${movie_id};`,function (error,results,fields){
            if(error) throw error;
        })
        res.redirect(`/booked_tickets?user_id=${user_id}`)
    });    
})

app.get('/account',(req,res)=>{
    let user=req.query.user
    if(typeof(user)===undefined || user==='Guest')
        res.redirect('/')
    else
        res.render('account.ejs',{user:user})
})

app.get('/booked_tickets',(req,res)=>{
    let user = req.query.user_id;
    let username = req.query.user;
    let movie_ids = [];
    let movie_name = [];
    let movie_type = [];
    let movie_length = [];
    let show_date = [];
    let show_time = [];
    let admits = [];
    let seat_type = [];
    let total_bills = [];

    connection.query(`SELECT Username,ticket.Movie_ID,ticket.Total_Bill,Movie_Name,Movie_Type,Movie_Length,Show_Date,Show_Time,Admits,Seat_Type FROM movie,ticket,customer where movie.movie_id=ticket.movie_id and ticket.customer_id=${user} and customer.cust_id=${user};`,function(error,results,fields){
        if(error) throw error;
        results.forEach(function(arrayItem){
            total_bills.push(arrayItem.Total_Bill)
            movie_name.push(arrayItem.Movie_Name)
            movie_type.push(arrayItem.Movie_Type)
            movie_length.push(arrayItem.Movie_Length)
            show_date.push(arrayItem.Show_Date.toDateString())
            show_time.push(arrayItem.Show_Time)
            admits.push(arrayItem.Admits)
            seat_type.push(arrayItem.Seat_Type)
            movie_ids.push(arrayItem.Movie_ID)
        })
        res.render("booked_tickets.ejs",{
            username:username,
            user:user,
            movie_names:movie_name,
            movie_types:movie_type,
            movie_lengths:movie_length,
            show_dates:show_date,
            show_times:show_time,
            admits:admits,
            seat_types:seat_type,
            movie_ids:movie_ids,
            total_bills:total_bills
        })
    })
})

app.get('/view_theatres',(req,res)=>{
    let user = req.query.user
    let user_id = req.query.user_id
    connection.query(`SELECT Theatre_Name,Theatre_Location,Theatre_Type FROM Theatre`,function(error,results,fields){
        if(error) throw error;
        theatre_name = []
        theatre_location = []
        theatre_type = []
        results.forEach(function(arrayItem){
            theatre_name.push(arrayItem.Theatre_Name)
            theatre_location.push(arrayItem.Theatre_Location)
            theatre_type.push(arrayItem.Theatre_Type)
        })
        res.render('view_theatre.ejs',{
            user:user,
            theatre_locations:theatre_location,
            theatre_names:theatre_name,
            theatre_types: theatre_type,
            user:user,
            user_id:user_id
        });
    })
    
})

app.get('/modify_booking',(req,res)=>{
    let user = req.query.user
    let user_id = req.query.user_id
    let movie_id = req.query.movie_id
    connection.query(`SELECT Admits,Seat_Type,Show_Time FROM ticket WHERE Customer_ID=${user_id} AND Movie_ID=${movie_id}`,function(error,results,fields){
        if (error) throw error;
        admits = results[0].Admits;
        seat_type = results[0].Seat_Type;
        show_time = results[0].Show_Time;
        res.render('modify_booking.ejs',{
            user:user,
            user_id:user_id,
            movie_id:movie_id,
            admits:admits,
            seat_type:seat_type,
            show_time:show_time
        })

    })
})

app.put('/modify_booking',urlencodedParser,async(req,res)=>{
    let movie_id = req.query.movie_id
    let username = req.query.username
    let user_id = req.query.user_id
    console.log(req.body)
    connection.query(`UPDATE ticket SET Seat_Type='${req.body.seat_type}',Admits=${req.body.admits},Show_Time='${req.body.show_time}' WHERE Customer_ID=${user_id} AND Movie_ID=${movie_id}`,function(error,results,fields){
        if(error) throw error;
        connection.query(`UPDATE TICKET SET Total_Bill = movie_db.Calculate_Total(Admits,Seat_Type) WHERE Customer_ID=${user_id} and Movie_ID=${movie_id};`,function (error,results,fields){
            if(error) throw error;
            res.redirect(`/booked_tickets?user_id=${user_id}&user=${username}`)
        })
    })

})

app.get('/delete_booking',(req,res)=>{
    let user_id = req.query.user_id;
    let user = req.query.user
    let movie_id = req.query.movie_id
    connection.query(`SELECT ticket.Total_Bill,Movie_Name,Movie_Type,Movie_Length,Show_Date,Show_Time,Admits,Seat_Type FROM movie,ticket,customer where ticket.movie_id=${movie_id} and movie.movie_id=ticket.movie_id and ticket.customer_id=${user_id} and customer.cust_id=${user_id};`,function(error,results,fields){
        if(error) throw error;
        let total_bill = results[0].Total_Bill
        let movie_name = results[0].Movie_Name
        let movie_type = results[0].Movie_Type
        let movie_length = results[0].Movie_Length
        let show_date = results[0].Show_Date
        let show_time = results[0].Show_Time
        let admits = results[0].Admits
        let seat_type = results[0].Seat_Type
        res.render('delete_booking.ejs',{
            user_id:user_id,
            user:user,
            movie_id:movie_id,
            total_bill:total_bill,
            movie_name:movie_name,
            movie_type:movie_type,
            movie_length:movie_length,
            show_date:show_date,
            show_time:show_time,
            admits:admits,
            seat_type:seat_type
        })
    })
})

app.delete('/delete_booking',urlencodedParser,async(req,res)=>{
    let user_id = req.query.user_id
    let movie_id = req.query.movie_id
    let user = req.query.user
    connection.query(`DELETE FROM ticket WHERE Customer_ID=${user_id} AND Movie_ID=${movie_id}`,function(error,results,fields){
        if(error) throw error;
        res.redirect(`/booked_tickets?user_id=${user_id}&user=${user}`)
    })
})

app.all('*', (req, res, next) => {
     next(new ExpressError('Page not Found', 404))
})

app.listen(8000,()=>{
    console.log("Listening to port 8000");
})