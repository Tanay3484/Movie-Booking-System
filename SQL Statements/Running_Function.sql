UPDATE ticket
SET Total_Bill = movie_db.Calculate_Total(Admits,Seat_Type);

SELECT * FROM ticket;