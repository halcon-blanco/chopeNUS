CREATE DATABASE chopeNUS;

CREATE TABLE booking_locations(
    location_name VARCHAR,
    faculty VARCHAR NOT NULL,
    room_name VARCHAR DEFAULT 'room',
    PRIMARY KEY(faculty, location_name, room_name)
);

CREATE TABLE chopers(
    teleID VARCHAR PRIMARY KEY,
    name VARCHAR NOT NULL
);

CREATE TABLE bookings(
    fac_name VARCHAR NOT NULL,
    loc_name VARCHAR NOT NULL,
    room VARCHAR NOT NULL,
    chopeID VARCHAR NOT NULL, 
    book_time TIMESTAMP,
    start_time TIMESTAMP,
    end_time TIMESTAMP,
    FOREIGN KEY(chopeID) REFERENCES chopers(teleID),
    FOREIGN KEY(fac_name, loc_name, room) REFERENCES booking_locations(faculty, location_name, room_name),
    PRIMARY KEY(fac_name, loc_name, room, chopeID, start_time, end_time)
);
