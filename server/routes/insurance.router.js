const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');


// get data from the demographic table to render to DOM
// demographic Saga and Reducer
router.get('/', rejectUnauthenticated, (req, res) => {

  const queryString = `SELECT * FROM "insurance" ORDER BY "name" ASC;`;
  
  pool.query(queryString)
    .then(result => {
      res.send(result.rows);
    })
    .catch(err => {
      console.log(`Error in getting data from DB ${err}`);
      res.sendStatus(500);
    });
});


module.exports = router;