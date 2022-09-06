module.exports = function reggie(db) {


    let regEx = /^(GP|ZJ|WP|EC)\s[0-9]{1,4}(\-|\s)?[0-9]{1,4}$/;


    async function RegNumber() {
        var car = await db.any("SELECT reg_number FROM my_regnumber");
        return car
    }

    async function storesRegNumber(reg) {
        if(regEx.test(reg) == false){
            return regEx.test(reg)
        }

        let registration = await db.manyOrNone('SELECT reg_number FROM my_regnumber WHERE reg_number = $1', [reg]);
        if (regEx.test(reg) && registration.length === 0) {
            let theReg = reg.slice(0, 2);
            let town_id = await db.one("SELECT id FROM my_town WHERE town_tag = $1", [theReg]);
            await db.none("INSERT into my_regnumber(reg_number,town_id) values($1,$2)", [reg, town_id.id]);
        }
    }

    async function filteReg(reg) {
        var town_id = await db.one("SELECT id FROM my_town WHERE town_tag = $1", [reg]);
        let towns_id = town_id.id
        return await db.manyOrNone("SELECT reg_number FROM my_regnumber WHERE town_id = $1", [towns_id])
    }
    
    async function removeData() {
        await db.none("DELETE FROM my_regnumber")
    }
      
    async function Show() {
        await db.manyOrNone("SELECT town_id FROM my_regnumber ")
    }

    return {
        RegNumber,
        storesRegNumber,
        removeData,
        filteReg,
        Show
    }
}




