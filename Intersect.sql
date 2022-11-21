/*
Name : Tanay Singh
SRN : PES2UG20CS364
Section : F
*/
SELECT Distinct Customer_ID From Ticket
INNER JOIN
Movie USING(Movie_ID);