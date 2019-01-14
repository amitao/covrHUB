const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');


// GET single policy
router.get('/:id', rejectUnauthenticated, (req, res) => {
  const queryString = `SELECT * FROM "policy" WHERE "person_id"=$1;`;
  
  pool.query(queryString,[req.user.id])
    .then( result => {
      res.send(result.rows);
    })
    .catch( err => {
      console.log(`Error in getting single policy from DB ${err}`);
      res.sendStatus(500);
    });
});


module.exports = router;