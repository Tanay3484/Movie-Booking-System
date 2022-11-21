/*
Name : Tanay Singh
SRN : PES2UG20CS364
Section : F
*/
UPDATE ticket
SET Total_Bill = movie_db.Calculate_Total(ticket.Admits,ticket.Seat_Type);