const assert = require('assert');
const reggie = require('../registration');
// const pgPromise = require('pg-promise');


const pgp = require('pg-promise')();
const local_database_url = 'postgres://postgres:codex123@localhost:5432/my_reg';
const connectionString = process.env.DATABASE_URL || local_database_url;

const config = {
  connectionString
}

if (process.env.NODE_ENV == "production") {
  config.ssl = {
    rejectUnauthorized: false
  }
}


const db = pgp(config);


describe("The Registration Database tests", async function () {
    
    beforeEach(async function(){
        await db.none('delete from my_regnumber')
    }); 
        it("Should return all the registration numbers that are stored ", async function () {
        
            const regNum =  reggie(db)
            const popo = await regNum.storesRegNumber("GP 457-456")
            assert.deepEqual( [
                {
                  reg_number: 'GP 457-456'
                }
              ] , await regNum.RegNumber())
            
        }); 

        it("Should return all the registration numbers that are stored ", async function () {
        
            const regNum =  reggie(db)
            const popo = await regNum.storesRegNumber("WP 457 123")
            assert.deepEqual( [
                {
                  reg_number: 'WP 457 123'
                }
              ] , await regNum.RegNumber())
            
        }); 

        it("Should return all the registration numbers that are stored ", async function () {
        
            const regNum =  reggie(db)
            const popo = await regNum.storesRegNumber("ZJ 345-967")
            assert.deepEqual( [
                {
                  reg_number: 'ZJ 345-967'
                }
              ] , await regNum.RegNumber())
            
        }); 
    
        it("Should return all the registration numbers that are stored ", async function () {
        
            const regNum =  reggie(db)
            const popo = await regNum.storesRegNumber("EC 236-267")
            assert.deepEqual( [
                {
                  reg_number: 'EC 236-267'
                }
              ] , await regNum.RegNumber())
            
        }); 

        it("Should be no registration numbers in a database when the clear button is pressed ", async function () {
        
            const regNum =  reggie(db)
             await regNum.storesRegNumber("ZJ")
            assert.deepEqual( "", await regNum.removeData())
            
        }); 
      
        it("Should be filtering by any town", async function () {
        
            const regNum =  reggie(db)
            let zompo = await regNum.filteReg("GP")
            assert.deepEqual( [],zompo)
            
        }); 

        // it("Should be able able to show all registration number in the database", async function () {
        
        //     const regNum =  reggie(db)
        //     await regNum.RegNumber("GP")
        //     assert.deepEqual( "" , await regNum.Show())
            
        // }); 

        
    //  after(async function () {
    // await db.manyOrNone('Truncate my_regnumber');
});