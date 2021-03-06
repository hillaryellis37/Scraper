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

  app.get("/api/items/:id", function(req, res) {
  // Grab every document in the Articles collection
    db.Item
      .findOne({ _id: req.params.id })
      .then(function(dbItem) {
        // If we were able to successfully find Articles, send them back to the client
        res.json(dbItem);
      })
      .catch(function(err) {
        // If an error occurred, send it to the client
        res.json(err);
      });
  });

  app.post("/api/items/saved", function(req, res) {
    console.log(req.body);
    db.Save
      .create(req.body)
      .then(function(dbSave) {
        res.json(dbSave);
      })
      .catch(function(err) {
        // If an error occurred, send it to the client
        res.json(err);
      });
  
  });

  app.get("/api/saved/", function(req, res) {

    db.Save
      .find({})
      .then(function(dbSaved) {
        res.json(dbSaved);

      })
      .catch(function(err) {
        res.json(err);
      });
  
  });  

  app.get("/api/saved/:id", function(req, res) {

    db.Save
      .findOne({_id: req.params.id})
      .populate("comment")
      .then(function(dbSaved) {
        res.json(dbSaved);

      })
      .catch(function(err) {
        res.json(err);
      });
  
  }); 

  app.delete("/api/saved/:id", function(req, res) {
    db.Save
    .findOne({_id: req.params.id})
    .then(function(dbItem) {
        dbItem.remove();
    });

  });

  app.post("/api/saved/:id", function(req, res) {
    db.Comment
    .create(req.body)
    .then(function(addComment) {
      return db.Save.findOneAndUpdate({ _id: req.params.id }, { comment: addComment._id }, { new: true });
    })
    .then(function(seeComment) {
      res.json(seeComment);

    })
    .catch(function(err) {
      res.json(err);
    });

  });

  app.get("/api/comments", function(req, res) {
    db.Comment
    .find({})
    .then(function(dbComment) {
      res.json(dbComment);
    })
    .catch(function(err) {
      res.json(err);
    })
  });



};