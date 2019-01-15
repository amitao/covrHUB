const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');


// get data from the demographic table to render to DOM
// demographic Saga and Reducer
// WILL NEED TO JOIN INSURANCE TABLE TO DEMO
router.get('/:id', rejectUnauthenticated, (req, res) => {
  const queryString = `SELECT * FROM "demographic" WHERE "person_id" = $1;`;
  pool.query(queryString, [req.user.id])
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

  const queryString = `INSERT INTO "demographic" ("first_name", "last_name", "birthday", "email", "address", "person_id")
                        VALUES ($1, $2, $3, $4, $5, $6);`;
  const queryValues = [req.body.fname, req.body.lname, req.body.birthday, req.body.email, req.body.address, req.user.id];
  pool.query(queryString, queryValues)
  .then( () => {
    res.sendStatus(201);
  })
  .catch( err => {
    console.log(`Error posting demo to DB ${err}`);
    res.sendStatus(500);
  });
});


router.put('/:id', rejectUnauthenticated, (req, res) => {
  console.log('in PUT route');

  const queryString = `UPDATE "demographic" SET "person_id"=$1;`;
  pool.query(queryString)
})




////////////////// IMAGE ///////////////////////
router.get('/image/:id', rejectUnauthenticated, (req, res) => {
  const queryString = `SELECT * FROM "image" WHERE "person_id" = $1;`;
  pool.query(queryString, [req.user.id])
  .then( result => {
    res.send(result.rows);
  })
  .catch ( err => {
    console.log(`Error in getting image from DB ${err}`);
    res.sendStatus(500);
  });
});


// post data into the demographic table
// addDemographics saga and reducer
router.post('/image', rejectUnauthenticated, (req, res) => {
  console.log('in POST route to add image:', req.user);

  const queryString = `INSERT INTO "image" ("image_url", "person_id")
                        VALUES ($1, $2);`;
  const queryValues = [req.body.image, req.user.id];
  pool.query(queryString, queryValues)
  .then( () => {
    res.sendStatus(201);
  })
  .catch( err => {
    console.log(`Error posting image to DB ${err}`);
    res.sendStatus(500);
  });
});



module.exports = router;