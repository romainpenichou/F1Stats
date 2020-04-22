-- DROP SCHEMA "work";

CREATE SCHEMA "work" AUTHORIZATION f1_stats_usr;

CREATE TABLE work.circuits (
	"circuit_id" integer,
	"circuit_ref" varchar(255),
	"name" varchar(255),
	"location" varchar(255),
	country varchar(255),
	lat float,
	lng float,
	alt integer,
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





CREATE OR REPLACE FUNCTION public.load_data()
 RETURNS boolean
 LANGUAGE plpgsql
AS $function$
BEGIN	
		
	insert into seasons(year, url)
	select year, url from "work".seasons
	on conflict(year) do 
		update 
		set url = EXCLUDED.url,
			"updatedAt" = NOW();
	
	insert into status("label")
	select "status" from "work".status
	on conflict("label") do nothing;
	
	insert into circuits("ref", "name", "location", country, lat, lng, alt, url)
	select circuit_ref, "name", "location", country, lat, lng, alt, url from "work".circuits
	on conflict("ref") do 
		update
		set "name" = EXCLUDED."name", 
			"location" = EXCLUDED."location", 
			country = EXCLUDED.country, 
			lat = EXCLUDED.lat, 
			lng = EXCLUDED.lng, 
			alt = EXCLUDED.alt, 
			url = EXCLUDED.url,
			"updatedAt" = NOW();
		
	insert into constructors("ref", "name", nationality, url)
	select constructor_ref, "name", nationality, url from "work".contructors
	on conflict("ref") do 
		update
		set "name" = EXCLUDED."name",
			nationality = EXCLUDED.nationality,
			url = EXCLUDED.url,
			"updatedAt" = NOW();
		
	insert into drivers("ref", "number", code, firstname, lastname, birthday, nationality, url)
	select driver_ref, "number", code, forename, surname, dob, nationality, url 
	from "work".drivers
	on conflict("ref") do
		update 
		set "ref" = EXCLUDED."ref",
			"number" = EXCLUDED."number",
			code = EXCLUDED.code,
			firstname = EXCLUDED.firstname,
			lastname = EXCLUDED.lastname,
			birthday = EXCLUDED.birthday,
			nationality = EXCLUDED.nationality,
			url = EXCLUDED.url,
			"updatedAt" = NOW();
		
	delete from races;
	
	insert into races("seasonId", "circuitId", "round", "name", "date", "time", url)
	select seasons.id as seasons_id
			, public.circuits.id as circuit_id
			, s.round
			, s."name"
			, s."date"
			, s."time"
			, s.url
	from "work".races as s
	inner join seasons on seasons."year" = s."year"
	inner join "work".circuits on "work".circuits.circuit_id = s.circuit_id
	inner join public.circuits on public.circuits."ref" = "work".circuits.circuit_ref
	on conflict ("seasonId", "round") do 
		update set 	"circuitId" = EXCLUDED."circuitId",
					"name" = EXCLUDED."name",
					"date" = EXCLUDED."date",
					"time" = EXCLUDED."time",
					url = EXCLUDED.url,
					"updatedAt" = NOW();
		
	insert into constructor_standings("constructorId", "raceId", points, "position", wins)
	select 	public.constructors.id
			, public.races.id
			, s.points
			, s."position"
			, s.wins
	from "work".constructor_standings s
	inner join "work".races on "work".races.race_id = s.race_id
	inner join "work".circuits on "work".circuits.circuit_id = "work".races.circuit_id
	inner join public.circuits on public.circuits."ref" = "work".circuits.circuit_ref
	inner join public.seasons on public.seasons."year" = "work".races."year"
	inner join public.races on public.races."seasonId" = public.seasons.id
	 							and public.races."circuitId" = public.circuits.id
	inner join "work".contructors on "work".contructors.constructor_id = s.constructor_id
	inner join public.constructors on public.constructors."ref" = "work".contructors.constructor_ref
	on conflict ("constructorId", "raceId") do 
		update set 	points = excluded.points,
					position = excluded.position,
					wins = excluded.wins,
					"updatedAt" = NOW();
	
	insert into constructor_results("constructorId", "raceId", points)
	select 	public.constructors.id
			, public.races.id
			, s.points
	from "work".contructor_result s
	inner join "work".races on "work".races.race_id = s.race_id
	inner join "work".circuits on "work".circuits.circuit_id = "work".races.circuit_id
	inner join public.circuits on public.circuits."ref" = "work".circuits.circuit_ref
	inner join public.seasons on public.seasons."year" = "work".races."year"
	inner join public.races on public.races."seasonId" = public.seasons.id
	 							and public.races."circuitId" = public.circuits.id
	inner join "work".contructors on "work".contructors.constructor_id = s.constructor_id
	inner join public.constructors on public.constructors."ref" = "work".contructors.constructor_ref
	on conflict ("constructorId", "raceId") do 
		update set 	points = excluded.points,
					"updatedAt" = NOW();
			
	insert into driver_standings("driverId", "raceId", points)
	select 	public.drivers.id
			, public.races.id
			, s.points
	from "work".driver_standings s
	inner join "work".races on "work".races.race_id = s.race_id
	inner join "work".circuits on "work".circuits.circuit_id = "work".races.circuit_id
	inner join public.circuits on public.circuits."ref" = "work".circuits.circuit_ref
	inner join public.seasons on public.seasons."year" = "work".races."year"
	inner join public.races on public.races."seasonId" = public.seasons.id
	 							and public.races."circuitId" = public.circuits.id
	inner join "work".drivers on "work".drivers.driver_id = s.driver_id
	inner join public.drivers on public.drivers."ref" = "work".drivers.driver_ref
	on conflict ("driverId", "raceId") do 
		update set 	points = excluded.points,
					"updatedAt" = NOW();
		
	insert into lap_times("driverId", "raceId", lap, "position", "time", milliseconds)
	select 	public.drivers.id
			, public.races.id
			, s.lap
			, s."position"
			, s.time
			, s.milliseconds
	from "work".lap_times s
	inner join "work".races on "work".races.race_id = s.race_id
	inner join "work".circuits on "work".circuits.circuit_id = "work".races.circuit_id
	inner join public.circuits on public.circuits."ref" = "work".circuits.circuit_ref
	inner join public.seasons on public.seasons."year" = "work".races."year"
	inner join public.races on public.races."seasonId" = public.seasons.id
	 							and public.races."circuitId" = public.circuits.id
	inner join "work".drivers on "work".drivers.driver_id = s.driver_id
	inner join public.drivers on public.drivers."ref" = "work".drivers.driver_ref
	on conflict ("driverId", "raceId", "lap") do 
		update set 	"position" = excluded."position",
					"time" = excluded."time",
					"milliseconds" = excluded.milliseconds,
					"updatedAt" = NOW();
		
		
	insert into pit_stops("driverId", "raceId", stop, lap, "position", time, duration, milliseconds)
	select 	public.drivers.id
			, public.races.id
			, s.stop
			, s.lap
			, s."position"
			, s.time
			, s.duration
			, s.milliseconds
	from "work".pit_stops s
	inner join "work".races on "work".races.race_id = s.race_id
	inner join "work".circuits on "work".circuits.circuit_id = "work".races.circuit_id
	inner join public.circuits on public.circuits."ref" = "work".circuits.circuit_ref
	inner join public.seasons on public.seasons."year" = "work".races."year"
	inner join public.races on public.races."seasonId" = public.seasons.id
	 							and public.races."circuitId" = public.circuits.id
	inner join "work".drivers on "work".drivers.driver_id = s.driver_id
	inner join public.drivers on public.drivers."ref" = "work".drivers.driver_ref
	on conflict ("driverId", "raceId", "lap") do 
		update set 	stop = excluded.stop,
					"position" = excluded."position",
					"time" = excluded."time",
					duration = excluded.duration,
					"milliseconds" = excluded.milliseconds,
					"updatedAt" = NOW();
					
	insert into qualifyings("raceId", "constructorId", "driverId", "number", "position", "q1", "q2", "q3")
	select 	public.races.id
			, public.constructors.id
			, public.drivers.id
			, s."number"
			, s."position"
			, s.q1
			, s.q2
			, s.q3
	from "work".qualifying s
	inner join "work".races on "work".races.race_id = s.race_id
	inner join "work".circuits on "work".circuits.circuit_id = "work".races.circuit_id
	inner join public.circuits on public.circuits."ref" = "work".circuits.circuit_ref
	inner join public.seasons on public.seasons."year" = "work".races."year"
	inner join public.races on public.races."seasonId" = public.seasons.id
	 							and public.races."circuitId" = public.circuits.id
	inner join "work".contructors on "work".contructors.constructor_id = s.constructor_id
	inner join public.constructors on public.constructors."ref" = "work".contructors.constructor_ref
	inner join "work".drivers on "work".drivers.driver_id = s.driver_id
	inner join public.drivers on public.drivers."ref" = "work".drivers.driver_ref
	on conflict ("driverId", "raceId") do 
		update set 	"number" = excluded."number",
					"position" = excluded."position",
					"q1" = excluded."q1",
					"q2" = excluded."q2",
					"q3" = excluded."q3",
					"updatedAt" = NOW();
					
	
	delete from results;
	insert into results(
		"raceId", 
		"constructorId", 
		"driverId", 
		"number", 
		"grid", 
		"position", 
		"positionOrder",
		points,
		laps,
		"time",
		millisecondes,
		fastestlap,
		"rank",
		"fastestLapTime",
		"fastestLapSpeed",
		"statusId")
	select 	public.races.id
			, public.constructors.id
			, public.drivers.id
			, s."number"
			, s.grid
			, s."position"
			, s."position_order"
			, s.points
			, s.laps
			, s."time"
			, s.milliseconds
			, s.fastestlap
			, s."rank"
			, s."fastestlaptime"
			, s."fastestlapspeed"
			, public.status.id
	from "work".results s
	inner join "work".races on "work".races.race_id = s.race_id
	inner join "work".circuits on "work".circuits.circuit_id = "work".races.circuit_id
	inner join public.circuits on public.circuits."ref" = "work".circuits.circuit_ref
	inner join public.seasons on public.seasons."year" = "work".races."year"
	inner join public.races on public.races."seasonId" = public.seasons.id
	 							and public.races."circuitId" = public.circuits.id
	inner join "work".contructors on "work".contructors.constructor_id = s.constructor_id
	inner join public.constructors on public.constructors."ref" = "work".contructors.constructor_ref
	inner join "work".drivers on "work".drivers.driver_id = s.driver_id
	inner join public.drivers on public.drivers."ref" = "work".drivers.driver_ref
	inner join "work".status on "work".status.status_id = s.statusid
	inner join public.status on public.status."label" = "work".status.status;

	return true;
END
$function$
;