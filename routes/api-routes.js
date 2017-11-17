var db = require("../models");

module.exports = function(app) {
  

  app.get("/api/articles", function(req,res){
    console.log(req);
  });



};