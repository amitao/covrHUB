const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');


router.get('/:id', rejectUnauthenticated, (req, res) => {
  const queryString = `SELECT * FROM "healthInsurance" WHERE "person_id" = $1;`;
  pool.query(queryString, [req.user.id])
  .then( result => {
    res.send(result.rows);
  })
  .catch ( err => {
    console.log(`Error in getting data from DB ${err}`);
    res.sendStatus(500);
  });
});


module.exports = router;