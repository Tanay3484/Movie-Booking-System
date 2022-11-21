/*
Name:Tanay Singh
SRN:PES2UG20CS364
Section:F
*/
SELECT Manager_ID,Manager_Fname,Manager_Lname,Theatre_Name,Theatre_Location,Theatre_Type 
FROM manager,theatre 
where 
manager.Theatre_ID=theatre.Theatre_ID;