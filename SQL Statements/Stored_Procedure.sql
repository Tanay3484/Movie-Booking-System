/*
Name : Tanay Singh
SRN : PES2UG20CS364
Section : F
*/
USE movie_db;
DELIMITER $$
CREATE PROCEDURE calculate_average_spend(Customer_ID INT)
BEGIN
	SELECT AVG(Total_Bill) AS `Average Spend` FROM ticket WHERE Customer_ID=Customer_ID;
END; $$
DELIMITER ;


CALL calculate_average_spend(3);