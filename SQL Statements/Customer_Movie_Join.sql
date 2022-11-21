/*
Name : Tanay Singh
SRN : PES2UG20CS364
Section : F
*/
SELECT Customer_Fname,Customer_Lname,Customer_email,Customer_Phone,Age,Movie_Name FROM customer,movie,ticket 
where 
customer.Cust_ID=ticket.Customer_ID and 
movie.Movie_ID=ticket.Movie_ID;