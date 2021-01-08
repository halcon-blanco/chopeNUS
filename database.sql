CREATE DATABASE chopeNUS;

CREATE TABLE booking_locations(
    location_name VARCHAR PRIMARY KEY,
    faculty VARCHAR NOT NULL
);

CREATE TABLE chopers(
    teleID VARCHAR PRIMARY KEY,
    name VARCHAR NOT NULL
);

CREATE TABLE bookings(
    loc_name VARCHAR NOT NULL,
    chopeID VARCHAR NOT NULL, 
    book_time TIMESTAMP,
    start_time TIMESTAMP,
    end_time TIMESTAMP,
    FOREIGN KEY(chopeID) REFERENCES chopers(teleID),
    FOREIGN KEY(loc_name) REFERENCES booking_locations(location_name),
    PRIMARY KEY(loc_name, chopeID, start_time, end_time)
);

-- table insertions
INSERT INTO booking_locations VALUES('pccomms', 'utown');
INSERT INTO chopers VALUES('@umergta', 'umer');
INSERT INTO bookings VALUES('pccomms', '@umergta', '2020-01-08 20:24:01','2020-01-09 15:00:00', '2020-01-09 16:00:00');