const assert = require('assert');
const myReggies = require('../registration');
const pgPromise = require('pg-promise');


const pgp = pgPromise({})

const local_database_url = 'postgres://codex:codex123@localhost:5432/my_regnumber';
const connectionString = local_database_url;


const db = pgp(connectionString);

 const towns = theTowns(db)

// describe("The Greeting Database tests", async function () {

//     beforeEach(async function(){
//         await db.none('delete from my_greet where id >=1')


after(async function () {
    await db.manyOrNone('Truncate my_greet');
});