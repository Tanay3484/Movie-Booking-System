/*
Name : Tanay Singh
SRN : PES2UG20CS364
Section : F
*/
USE movie_db;
SELECT Movie_Name,Movie_Type,Movie_Length,Show_Date,Show_Time,Admits,Seat_Type 
FROM movie,ticket 
where 
movie.movie_id=ticket.movie_id and 
ticket.customer_id=1;