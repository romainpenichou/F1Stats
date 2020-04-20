-- DROP SCHEMA "work";

CREATE SCHEMA "work" AUTHORIZATION f1_stats_usr;

CREATE TABLE work.circuits (
	"circuit_id" varchar(255),
	"circuit_ref" varchar(255),
	"name" varchar(255),
	"location" varchar(255),
	country varchar(255),
	lat float,
	lng float,
	alt varchar(255),
	"url" varchar(255)
);

CREATE TABLE work.contructor_result(
	constructor_results_id integer,
	race_id integer,
	constructor_id integer,
	points float
);

CREATE TABLE work.contructors (
	constructor_id integer,
	constructor_ref varchar(255),	
	name varchar(255),
	nationality varchar(255),	
	url varchar(255)
);

CREATE TABLE work.constructor_standings (
	constructor_standings_id integer,	
	race_id integer,
	constructor_id integer,
	points float,
	position integer,
	wins integer
);

CREATE TABLE work.drivers (
	driver_id integer,
	driver_ref varchar(255),
	number integer,
	code varchar(3),
	forename varchar(255),
	surname varchar(255),
	dob date,
	nationality varchar(255),
	url varchar(255)
);

CREATE TABLE work.driver_standings (
	driver_standings_id integer,
	race_id integer,
	driver_id integer,
	points float,
	position integer,
	wins integer 
);

CREATE TABLE work.lap_times (
	race_id integer,
	driver_id integer,
	lap integer,
	position integer,
	"time" varchar(255),
	milliseconds integer
);

CREATE TABLE work.pit_stops (
	race_id integer,
	driver_id integer,
	"stop" integer,
	lap integer,
	position integer,
	"time" time,
	"duration" varchar(255),
	milliseconds integer
);

CREATE TABLE work.qualifying (
	qualify_id integer,
	race_id integer,
	driver_id integer,
	constructor_id integer,
	"number" integer,
	position integer,
	q1 time,
	q2 time,
	q3 time
);

CREATE TABLE work.races(
	race_id integer,
	year integer,
	round integer,
	circuit_id integer,
	"name" varchar(255),
	"date" date,
	"time" time,
	"url" varchar(255)
);

CREATE TABLE work.results(
	result_id integer,
	race_id integer,
	driver_id integer,
	constructor_id integer,
	"number" integer,
	grid integer,
	position integer,
	position_order integer,
	points float,
	laps integer,
	"time" varchar(255),
	milliseconds integer,
	fastestLap integer,
	rank integer,
	fastestLapTime varchar(255),
	fastestLapSpeed varchar(255),
	statusId integer
);

CREATE TABLE work.seasons (
	"year" integer NOT NULL,
	"url" varchar(255) NULL
);

CREATE TABLE work.status(
	status_id integer,
	status varchar(255)
);