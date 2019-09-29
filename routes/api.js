/*
 *
 *
 *       Complete the API routing below
 *
 *
 */

"use strict";

var expect = require("chai").expect;
var MongoClient = require("mongodb");
var ObjectId = require("mongodb").ObjectID;
require("dotenv").config();

const database = "project-tracker";
let Tracker;

const CONNECTION_STRING = process.env.DB;

MongoClient.connect(
  CONNECTION_STRING,
  { useNewUrlParser: true, useUnifiedTopology: true },
  (err, client) => {
    if (err) return console.log("unable to connect to database");
    Tracker = client.db(database);
    return Tracker;
  }
);

module.exports = function(app) {
  app
    .route("/api/issues/:project")

    .get(function(req, res) {
      const { query } = req;
      if (query.open === "true" || query.open == "") {
        query.open = true;
      }
      if (query.open === "false") {
        query.open = false;
      }

      Tracker.collection("issue")
        .find(query)
        .toArray()
        .then(tracker => {
          return res.send(tracker);
        })
        .catch(err => res.status(400).send());
    })

    .post(function(req, res) {
      var project = req.params.project;
      const {
        issue_title,
        issue_text,
        created_by,
        assigned_to,
        status_text
      } = req.body;

      //if field is missing
      if (!issue_title || !issue_text || !created_by) {
        return res.json("Missing required field(s)");
      }

      Tracker.collection("issue")
        .insertOne({
          issue_title,
          issue_text,
          created_by,
          assigned_to,
          status_text,
          created_on: new Date(),
          updated_on: new Date(),
          open: true
        })
        .then(doc => res.status(200).json(doc.ops[0]))
        .catch(err => res.status(400).send());
    })

    .put(function(req, res) {
      const _id = req.body._id;
      let update = { $set: {} };
      let isFieldEmpty = true;

      try {
        ObjectId(_id);
      } catch (err) {
        return res.status(400).send(`could not update ${_id}`);
      }

      //exlude the _id fields
      //and include all other fields
      let keys = Object.keys(req.body).filter(id => id !== "_id");

      //update every field
      //eg: issue_title = "Hello"
      keys.forEach(key => {
        if (req.body[key]) {
          //update only field with given paramater
          update.$set[key] = req.body[key];
          isFieldEmpty = false;
        }
      });

      //converting string to boolean
      if (req.body.hasOwnProperty("open")) {
        update.$set.open = false;
        isFieldEmpty = false;
      }

      // if field is empty then return 304
      if (isFieldEmpty) {
        return res.status(400).send("no updated field sent");
      }

      //update new timestamp
      update.$set.updated_on = new Date();

      Tracker.collection("issue")
        .updateMany({ _id: ObjectId(_id) }, update)
        .then(doc => {
          if (doc.matchedCount > 0) {
            return res.send("successfully updated");
          }
          return res.send(`could not update ${_id}`);
        })
        .catch(err => res.send(`could not update ${_id}`));
    })

    .delete(function(req, res) {
      const _id = req.body._id;

      try {
        ObjectId(_id);
      } catch (error) {
        return res.status(400).send("_id error");
      }

      Tracker.collection("issue")
        .findOneAndDelete({ _id: ObjectId(_id) })
        .then(tracker => {
          if (!tracker) {
            return res.status(400).send(`could not delete ${_id}`);
          }
          return res.status(200).send(`deleted ${_id}`);
        })
        .catch(err => res.status(400).send(`could not delete ${_id}`));
    });
};
