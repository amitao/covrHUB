const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');


// get data from the demographic table to render to DOM
// demographic Saga and Reducer
// WILL NEED TO JOIN INSURANCE TABLE TO DEMO
router.get('/:id', rejectUnauthenticated, (req, res) => {
  const queryString = `SELECT * FROM "demographic" WHERE "person_id" = $1;`;
  pool.query(queryString, [req.params.id])
  .then( result => {
    res.send(result.rows);
  })
  .catch ( err => {
    console.log(`Error in getting data from DB ${err}`);
    res.sendStatus(500);
  });
});



// post data into the demographic table
// addDemographics saga and reducer
router.post('/', rejectUnauthenticated, (req, res) => {
  console.log('in POST route to add demo:', req.user);

  const queryString = `INSERT INTO "demographic" ("first_name", "last_name", "email", "address", "person_id")
                        VALUES ($1, $2, $3, $4, $5);`;
  const queryValues = [req.body.fname, req.body.lname, req.body.email, req.body.address, req.user.id];
  pool.query(queryString, queryValues)
  .then( () => {
    res.sendStatus(201);
  })
  .catch( err => {
    console.log(`Error posting demo to DB ${err}`);
    res.sendStatus(500);
  });
});


module.exports = router;