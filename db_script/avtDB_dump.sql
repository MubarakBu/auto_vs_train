PRAGMA foreign_keys=OFF;
BEGIN TRANSACTION;
CREATE TABLE stations
(station_id INTEGER PRIMARY KEY,
station_name TEXT NOT NULL,
status TEXT NOT NULL,
latitude FLOAT NOT NULL,
longitude FLOAT NOT NULL
);

INSERT INTO stations VALUES(13,'Oxford', 'Proposed', 39.508303, -84.747612);
INSERT INTO stations VALUES(14,'Hamilton', 'Proposed', 39.394129, -84.559032);
INSERT INTO stations VALUES(15,'North Cincinnati', 'Proposed', 39.513862, -84.392218);
INSERT INTO stations VALUES(16,'Cincinnati', 'Proposed', 39.110029, -84.538092);
INSERT INTO stations VALUES(17,'Dayton', 'Proposed', 39.755421, -84.192960);
INSERT INTO stations VALUES(18,'Springfield', 'Proposed', 39.922300, -83.813084);
INSERT INTO stations VALUES(19,'Columbus', 'Proposed', 39.971279, -83.000676);
INSERT INTO stations VALUES(20,'Lindon', 'Proposed', 40.039067, -82.998781);
INSERT INTO stations VALUES(21,'Worthington', 'Proposed', 40.107263, -83.004012);
INSERT INTO stations VALUES(22,'Delaware', 'Proposed', 40.300519, -83.058500);
INSERT INTO stations VALUES(23,'Galion', 'Proposed', 40.734489, -82.783810);
INSERT INTO stations VALUES(24,'West Cleveland', 'Proposed', 41.406009, -81.819997);
INSERT INTO stations VALUES(25,'Cleveland Lakefront', 'Proposed', 41.505653, -81.696468);
INSERT INTO stations VALUES(26,'Fort Wayne', 'Proposed', 41.072143, -85.140081);
INSERT INTO stations VALUES(27,'Lima', 'Proposed', 40.744824, -84.102180);
INSERT INTO stations VALUES(28,'Kenton', 'Proposed', 40.643780, -83.608820);
INSERT INTO stations VALUES(29,'Marysville', 'Proposed', 40.238713, -83.366358);
INSERT INTO stations VALUES(30,'Dublin/Hilliard', 'Proposed', 40.035155, -83.135101);
INSERT INTO stations VALUES(31,'John Glenn Airport', 'Proposed', 39.983654, -82.912696);
INSERT INTO stations VALUES(32,'Newark', 'Proposed', 40.057257, -82.392117);
INSERT INTO stations VALUES(33,'Dennison', 'Proposed', 40.392146, -81.332174);
INSERT INTO stations VALUES(34,'Bryan', 'Proposed', 41.4803, -84.5517);
INSERT INTO stations VALUES(35,'Toledo', 'Proposed', 41.637778, -83.541667);
INSERT INTO stations VALUES(36,'Sandusky', 'Proposed', 41.440556, -82.718611);
INSERT INTO stations VALUES(37,'Elyria', 'Proposed', 41.3701, -82.0968);
INSERT INTO stations VALUES(38,'Rossford', 'Proposed', 41.585656, -83.539539);
INSERT INTO stations VALUES(39,'Bowling Green', 'Proposed', 41.376915, -83.644740);
INSERT INTO stations VALUES(40,'Findlay', 'Proposed', 41.036721, -83.644098);

INSERT INTO stations VALUES(41, 'Petoskey', 'Proposed', 45.367806, -84.960728);
INSERT INTO stations VALUES(42, 'Traverse City', 'Proposed', 44.758123, -85.609695);
INSERT INTO stations VALUES(43, 'Cadillac', 'Proposed', 44.250900, -85.403244);
INSERT INTO stations VALUES(44, 'Mt. Pleasant', 'Proposed', 43.588868, -84.778741);
INSERT INTO stations VALUES(45, 'Alma', 'Proposed', 43.379351, -84.667148);
INSERT INTO stations VALUES(46, 'Owosso', 'Proposed', 42.994386, -84.170232);
INSERT INTO stations VALUES(47, 'Durand', 'Proposed', 42.909351, -83.982415);
INSERT INTO stations VALUES(48, 'Howell', 'Proposed', 42.609403, -83.929383);
INSERT INTO stations VALUES(49, 'Ann Arbor', 'Proposed', 42.264027, -83.742900);
INSERT INTO stations VALUES(50, 'Detroit', 'Proposed', 42.331881, -83.050798);
INSERT INTO stations VALUES(51, 'Battle Creek', 'Proposed', 42.321010, -85.177224);
INSERT INTO stations VALUES(52, 'Kalamazoo', 'Proposed', 42.291614, -85.587294);
INSERT INTO stations VALUES(53, 'Holland', 'Proposed', 42.787369, -86.109753);
INSERT INTO stations VALUES(54, 'Grand Rapids', 'Proposed', 42.962870, -85.669361);
INSERT INTO stations VALUES(55, 'Port Huron', 'Proposed', 42.971190, -82.425261);

CREATE TABLE search_log (
search_id INTEGER PRIMARY KEY,
ipaddress TEXT,
searchtime TIMESTAMP,
take_train BOOLEAN,
start_latitude FLOAT,
start_longitude FLOAT,
end_latitude FLOAT,
end_longitude FLOAT
);
CREATE TABLE routes (
station_id_1 INTEGER NOT NULL,
station_id_2 INTEGER NOT NULL,
distance FLOAT,
travel_time FLOAT,
FOREIGN KEY(station_id_1) REFERENCES stations(station_id),
FOREIGN KEY(station_id_2) REFERENCES stations(station_id),
PRIMARY KEY(station_id_1, station_id_2)
);


INSERT INTO routes VALUES(13,14,12.78,10.65);
INSERT INTO routes VALUES(14,15,12.15,10.13);
INSERT INTO routes VALUES(15,16,28.97,24.14);

INSERT INTO routes VALUES(16,17,48.24,40.2);
INSERT INTO routes VALUES(17,18,23.22,19.35);
INSERT INTO routes VALUES(18,19,43.16,35.97);
INSERT INTO routes VALUES(19,20,4.68,3.9);
INSERT INTO routes VALUES(20,21,4.72,3.93);
INSERT INTO routes VALUES(21,22,13.66,11.38);
INSERT INTO routes VALUES(22,23,33.27,27.73);
INSERT INTO routes VALUES(23,24,68.36,56.98);
INSERT INTO routes VALUES(24,25,9.4,7.83);

INSERT INTO routes VALUES(26,27,58.72,48.93);
INSERT INTO routes VALUES(27,28,26.77,22.31);
INSERT INTO routes VALUES(28,29,30.75,25.63);
INSERT INTO routes VALUES(29,30,18.63,15.53);
INSERT INTO routes VALUES(30,19,8.37,6.98);
INSERT INTO routes VALUES(19,31,4.74,3.95);
INSERT INTO routes VALUES(31,32,28.01,23.34);
INSERT INTO routes VALUES(32,33,60.51,50.43);

INSERT INTO routes VALUES(34,35,53.34,44.45);
INSERT INTO routes VALUES(35,36,44.69,37.24);
INSERT INTO routes VALUES(36,37,32.59,27.16);
INSERT INTO routes VALUES(37,25,22.75,18.96);

INSERT INTO routes VALUES(35,38,3.6,3);
INSERT INTO routes VALUES(38,39,15.42,12.85);
INSERT INTO routes VALUES(39,40,23.5,19.58);
INSERT INTO routes VALUES(40,28,27.21,22.68);

INSERT INTO routes VALUES(41,43,80.16,66.8);
INSERT INTO routes VALUES(42,43,36.49,30.41);
INSERT INTO routes VALUES(43,44,55.3,46.08);
INSERT INTO routes VALUES(44,45,15.52,12.93);
INSERT INTO routes VALUES(45,46,36.52,30.43);
INSERT INTO routes VALUES(46,47,11.17,9.31);
INSERT INTO routes VALUES(47,48,20.9,17.42);
INSERT INTO routes VALUES(48,49,25.69,21.41);

INSERT INTO routes VALUES(55,47,78.87,65.7);
INSERT INTO routes VALUES(47,51,73.09,60.9);

INSERT INTO routes VALUES(50,49,35.68,29.7);
INSERT INTO routes VALUES(49,51,73.41,61.2);
INSERT INTO routes VALUES(51,52,21.05,17.5);

INSERT INTO routes VALUES(50,48,48.71,40.6);
INSERT INTO routes VALUES(48,54,91.45,76.2);
INSERT INTO routes VALUES(54,53,25.38,21.2);

INSERT INTO routes VALUES(35,50,54.18,45.2);



COMMIT;
