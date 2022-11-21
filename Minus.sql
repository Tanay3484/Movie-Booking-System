/*
Name : Tanay Singh
SRN : PES2UG20CS364
Section : F
*/
SELECT Cust_ID From Customer
LEFT JOIN Ticket ON Customer_ID
WHERE Ticket.Customer_ID IS NULL;