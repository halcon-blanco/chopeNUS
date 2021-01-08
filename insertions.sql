-- insertions for booking_locations
INSERT INTO booking_locations VALUES('pccommons', 'UTown');
INSERT INTO booking_locations VALUES('maccommons', 'UTown');

-- insertions for chopers
INSERT INTO chopers VALUES('1212121', 'umer');
INSERT INTO chopers VALUES('1234567', 'saad');
INSERT INTO chopers VALUES ('7654321', 'nauman');
INSERT INTO chopers VALUES ('5643215', 'usman');

--insertions for bookings
INSERT INTO bookings VALUES('UTown', 'pccommons','room', '1212121', '2020-01-08 20:24:01','2020-01-09 15:00:00', '2020-01-09 16:00:00');
INSERT INTO bookings VALUES('UTown', 'pccommons','room', '1234567', '2020-01-08 20:24:02','2020-01-09 15:00:00', '2020-01-09 16:00:00');
INSERT INTO bookings VALUES('UTown', 'pccommons','room', '7654321', '2020-01-08 20:24:03','2020-01-09 15:00:00', '2020-01-09 16:00:00');
INSERT INTO bookings VALUES('UTown', 'pccommons','room', '5643215', '2020-01-08 20:24:04','2020-01-09 15:00:00', '2020-01-09 16:00:00');
INSERT INTO bookings VALUES('UTown', 'maccommons', 'room', '1234567', '2020-01-08 20:24:05','2020-01-09 15:00:00', '2020-01-09 16:00:00');
INSERT INTO bookings VALUES('UTown', 'pccommons','room', '1234567', '2020-01-08 20:24:06','2020-01-09 16:00:00', '2020-01-09 17:00:00');