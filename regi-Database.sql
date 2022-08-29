CREATE TABLE my_town(
id SERIAL PRIMARY KEY,
town_name text NOT NULL,
town_tag text NOT NULL
);

insert into my_town (town_name ,town_tag) values (
    'Gcuwa','ZJ');
insert into my_town (town_name,town_tag) values (
    'Gauteng','GP');
insert into my_town (town_name,town_tag) values (
    'Eastern Cape','EC');
insert into my_town (town_name,town_tag) values (
    'Western Province','WP');


CREATE TABLE my_regnumber(
id SERIAL PRIMARY KEY,
reg_number text NOT NULL,
town_id integer NOT NULL,
foreign key (town_id) references my_town(id)
)