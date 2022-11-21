USE movie_db;

CREATE table Movie(Movie_ID int NOT NULL, Movie_Type varchar(100), Release_date Date NOT NULL, Cast varchar(100), Movie_name varchar(50), Movie_Lang varchar(10), Movie_Desc varchar(200), Movie_Length int, PRIMARY KEY(Movie_ID));
CREATE table Schedule(Movie_ID int NOT NULL, Show_time time, Show_date Date, foreign key(Movie_ID) references Movie(Movie_ID));
CREATE table Customer(Cust_ID int NOT NULL, Customer_Phone bigint, Customer_email varchar(50), Customer_Fname varchar(50), Customer_Lname varchar(50),primary key(Cust_ID));
CREATE table Watches(Cust_ID int NOT NULL, Movie_ID int NOT NULL, Foreign key(Cust_ID) references Customer(Cust_ID),foreign key(Movie_ID) references Movie(Movie_ID));
CREATE table Payment_Method(Cust_ID int NOT NULL, Card_No bigint NOT NULL, Cardholder_Name varchar(50) NOT NULL, Card_expiry date NOT NULL, foreign key(Cust_ID) references Customer(Cust_ID));
CREATE table Screen(Screen_No int NOT NULL, Screen_Timing time NOT NULL,Seating_Capacity int NOT NULL, primary key(Screen_No)); 
CREATE table Theatre(Theatre_ID int NOT NULL, Screen_No int NOT NULL, Theatre_Name varchar(50) NOT NULL, Theatre_Location varchar(50) NOT NULL, Theatre_Type varchar(10) NOT NULL, primary key(Theatre_ID), foreign key(Screen_No) references Screen(Screen_No));
CREATE table Ticket(Movie_ID int NOT NULL, Theatre_ID int NOT NULL, Screen_No int NOT NULL, Show_Date date NOT NULL, Show_Time time NOT NULL, Admits int NOT NULL, Total_Bill int NOT NULL, foreign key(Movie_ID) references Movie(Movie_ID), foreign key(Theatre_ID) references Theatre(Theatre_ID), foreign key(Screen_No) references Screen(Screen_No));
CREATE table Manager(Manager_ID int NOT NULL, Theatre_ID int NOT NULL, Manager_Fname varchar(50) NOT NULL, Manager_Lname varchar(50) NOT NULL, Manager_Phone bigint, Primary Key(Manager_ID), Foreign key(Theatre_ID) references Theatre(Theatre_ID));
CREATE table Streams(Movie_ID int NOT NULL, Screen_No int NOT NULL, foreign key(Movie_ID) references Movie(Movie_ID), foreign key(Screen_No) references Screen(Screen_No));