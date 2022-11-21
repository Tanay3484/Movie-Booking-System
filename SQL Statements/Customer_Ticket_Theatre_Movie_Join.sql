/*
Name : Tanay Singh
SRN : PES2UG20CS364
Section : F 
*/
SELECT Customer_Fname,Customer_Lname,Movie_Name,Movie_Lang,Movie_Length,Movie_Type,Theatre_Name,Theatre_Location,Show_Date,Show_Time,Theatre_Type 
FROM ticket,theatre,movie,customer 
where 
ticket.theatre_id=theatre.Theatre_ID and 
ticket.movie_id=movie.movie_id and 
ticket.customer_id=customer.cust_id;