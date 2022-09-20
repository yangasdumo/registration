module.exports = function Registration(plates) {


    async function home(req, res) {
        let output = await plates.RegNumber()
        res.render("index", {
          output
        });
      }

      async function registration(req, res) {
        let cars = req.body.reg
        if(cars == null || cars == '' || await plates.storesRegNumber(cars) === false) {
          req.flash('message', "Registration number not valid")
        }else{
          await plates.storesRegNumber(cars)
        }
        res.redirect("/");
      }

   
      async function filtering(req, res) {
        let output = []
        let reg = req.body.town
        if (reg == false || reg == undefined){
          req.flash('message',"Please select a registration Town ")
        }
        output = await plates.filteReg(reg)
          console.log(await plates.filteReg(reg));
        if(output.length === 0){
          req.flash('message',"No registration numbers for town")
        }
        else{
          output
        }
        res.render("index", {
          output
        });
      }
   
      async function getFiltering(req, res) {
        let reg = req.body.town
        let output = await plates.filteReg(reg);
        res.render("index", {
          output
        });
      }

      async function clear(req, res) {
        await plates.removeData()
        req.flash('message', "All Data Has Been Cleared !!")
        res.redirect("/")
      
      }
        
    return{
        home,
        registration,
        filtering,
        getFiltering,
        clear
    }
   
};