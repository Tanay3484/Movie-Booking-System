/*
Name: Tanay Singh
SRN: PES2UG20CS364
Section: F
*/
USE movie_db;
DELIMITER $$
CREATE FUNCTION Calculate_Total(Admits int,Seat_Type varchar(10))
RETURNS int
deterministic
BEGIN
		DECLARE total_value INT;
        IF Seat_Type='Silver' THEN
			SET total_value=((320*Admits)+(0.28*320));
		ELSEIF Seat_Type='Gold' THEN
			SET total_value=((340*Admits)+(0.28*340));
		ELSE
			SET total_value=((610*Admits)+(0.28*610));
	END IF;
		RETURN total_value;
END;$$
DELIMITER ;