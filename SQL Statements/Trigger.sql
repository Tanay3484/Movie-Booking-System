/*
Name : Tanay Singh
SRN : PES2UG20CS364
Section : F
*/
USE movie_db;
DELIMITER $$
CREATE trigger check_number_of_admits
AFTER INSERT
ON ticket for EACH ROW
BEGIN
	DECLARE error_msg VARCHAR(255);
    SET error_msg = ('Cannot book more than 10 seats per account');
    IF new.Admits>10 THEN
    SIGNAL SQLSTATE '45000'
    SET MESSAGE_TEXT = error_msg;
    END IF;
END $$
DELIMITER ;