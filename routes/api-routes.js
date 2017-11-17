var db = require("../models");
var axios = require("axios");
var cheerio = require("cheerio");

module.exports = function(app) {
  
//scrape route
  app.get("/scrape", function(req,res){
    axios.get("https://poshmark.com/closet/hillaryellis37").then(function(response) {
    // Then, we load that into cheerio and save it to $ for a shorthand selector
    var $ = cheerio.load(response.data);

    // Now, we grab every h2 within an article tag, and do the following:
    $(".tile .covershot-con").each(function(i, element) {
    //   // Save an empty result object
      var result = {};
      
      var title = $(this).attr("title");
      var link = "https://poshmark.com" + $(this).attr("href");
      var img = $(this).children("img").attr('src');

      result.title = title;
      result.link = link;
      result.img = img;


      db.Item
        .create(result)
        .then(function(dbItem) {
          res.send("Scrape Complete");
        })
        .catch(function(err) {
          res.json(err);
        });
      });
    });
  });

  app.get("/api/items", function(req, res) {
  // Grab every document in the Articles collection
    db.Item
      .find({})
      .then(function(dbItem) {
        // If we were able to successfully find Articles, send them back to the client
        res.json(dbItem);
      })
      .catch(function(err) {
        // If an error occurred, send it to the client
        res.json(err);
      });
  });


};