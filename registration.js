module.exports = function reggie(db) {

    var regEx = /[GP|EC|WP][ZJ]{2}(\s)[0-9]{3}(\s|\-)[0-9]{3}/gi


    async function RegNumber() {
        var car = await db.manyOrNone(" SELECT reg_number FROM my_regnumber")
        return car
    }

    async function storesRegNumber(reg) {
        // let reg2 = reg.toUpperCase()

        // if (regEx.test(reg2)) {
            var registration = await db.manyOrNone('SELECT reg_number FROM my_regnumber WHERE reg_number =$1', [reg])
            var theReg = reg.slice(0, 2);
            var town_id = await db.one("SELECT id FROM my_town WHERE town_tag = $1", [theReg]);
            // console.log(town_id.id + "  sdfghjkl;");

            if (registration.length === 0) {
                await db.none("INSERT into my_regnumber(reg_number,town_id) values($1,$2)", [reg, town_id.id]);

            }

        // }
    }


    async function filteReg(reg) {
        var theReg = reg.slice(0, 2);
        var town_id = await db.one("SELECT id FROM my_town WHERE town_tag = $1", [theReg]);
        let towns_id = town_id.id
        return await db.manyOrNone("SELECT reg_number FROM my_regnumber WHERE town_id = $1", [towns_id])
    }



    async function removeData() {
        await db.none("DELETE FROM my_regnumber")
    }

    return {
        RegNumber,
        storesRegNumber,
        removeData,
        filteReg,
    }

}



