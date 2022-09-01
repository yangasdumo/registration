module.exports = function Registration(plates) {


    async function home(req, res) {
        let output = await plates.RegNumber()
        res.render("index", {
          output
        });
      }

      async function registration(req, res) {
        let cars = req.body.reg
        if (cars == null || cars == '') {
          req.flash('message', "Please enter your registration number !!")
        }else{
          await plates.storesRegNumber(cars)
        }
        res.redirect("/");
      
      }

   
      async function filtering(req, res) {
        let reg = req.body.town
        let output = await plates.filteReg(reg)
        res.render("index", {
          output
        });
      }
   
      async function filteringe(req, res) {
        let reg = req.body.town
        let output = await plates.filteReg(reg)
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
        filteringe,
        clear
    }
   
};