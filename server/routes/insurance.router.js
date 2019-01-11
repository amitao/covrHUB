const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');


// get data from the demographic table to render to DOM
// demographic Saga and Reducer
router.get('/:id', rejectUnauthenticated, (req, res) => {
  const queryString = `SELECT * FROM "insurance" WHERE "person_id" = $1;`;
  pool.query(queryString, [req.user.id])
    .then(result => {
      res.send(result.rows);
    })
    .catch(err => {
      console.log(`Error in getting data from DB ${err}`);
      res.sendStatus(500);
    });
});


// post Insurance to db
router.post('/', rejectUnauthenticated, (req, res) => {
  console.log(`in POST route to add insurance to db ${req.user}`);

  const queryString = ` INSERT INTO "insurance" ("name", "address", "effective_date", "term_date",
                      "member_number", "group_number", "person_id")
                      VALUES ($1,$2,$3,$4,$5,$6,$7);`;
  const queryValues = [req.body.name, req.body.address, req.body.effective, req.body.term, req.body.memberId, req.body.group, req.user.id];
  pool.query(queryString, queryValues)
    .then(() => {
      res.sendStatus(201);
    })
    .catch(err => {
      console.log(`Error in posting insurance to DB ${err}`);
      res.sendStatus(500);
    })
})

router.delete('/:id', (req, res) => {
  let queryString = `DELETE FROM "insurance" WHERE "id"=$1;`;
  pool.query(queryString, [req.params.id])
  .then ( () => {
      res.sendStatus(200);
  })
  .catch ( err => {
      console.log('ERROR deleting in DB:', err);
      res.sendStatus(500)
  })
})

module.exports = router;