const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');


/// GET after post route to add new benefits
router.get('/add/:id', rejectUnauthenticated, (req, res) => {
  console.log(req.params.id);

  const queryString = `SELECT * FROM "benefit" WHERE "person_id"=$1;`;
  pool.query(queryString, [req.user.id])
    .then(result => {
      res.send(result.rows);
    })
    .catch(err => {
      console.log(`Error in getting data from DB ${err}`);
      res.sendStatus(500);
    });
});


router.post('/add', rejectUnauthenticated, (req, res) => {
  console.log(`in POST route to add post to db ${req.user}`);

  const queryString = `INSERT INTO "benefit" ("deductible_in", "deductible_out", "coinsurance_in", 
                      "coinsurance_out", "copay_in", "copay_special", "oop_in", "oop_out", "person_id")
                      VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9);`;

  const queryValues = [req.body.dedIn, req.body.dedOut, req.body.coinsuranceIn, req.body.coinsuranceOut,
  req.body.copayPCP, req.body.copaySpecial, req.body.oopIn, req.body.oopOut, req.user.id];

  pool.query(queryString, queryValues)
    .then(() => {
      res.sendStatus(201);
    })
    .catch(err => {
      console.log(`Error in posting insurance to DB ${err}`);
      res.sendStatus(500);
    })
})


///////////// PAID BENEFITS //////////////////

router.post('/paid', rejectUnauthenticated, (req, res) => {
  const queryString = `INSERT INTO "benefitpaid" ("ded_in_paid", "ded_out_paid", "oop_in_paid", "oop_out_paid", "date", "person_id") 
                        VALUES ($1,$2,$3,$4,$5, $6) RETURNING "id";`

  const queryValues = [req.body.dedInPaid, req.body.dedOutPaid, req.body.oopInPaid, req.body.oopOutPaid, req.body.date, req.user.id];
  pool.query(queryString, queryValues)
    .then(() => {
      res.sendStatus(201);
    })
    .catch(err => {
      console.log(`Error in posting insurance to DB ${err}`);
      res.sendStatus(500);
    })
})


router.get('/paid/:id', rejectUnauthenticated, (req, res) => {
  console.log('hitting paid beneefit get request?');
  const queryString = `SELECT * FROM "benefitpaid" WHERE "person_id"=$1; `;
  pool.query(queryString, [req.user.id])
    .then(result => {
      // console.log(result.rows);
      res.send(result.rows);
    })
    .catch(err => {
      console.log(`Error in getting data from DB ${err}`);
      res.sendStatus(500);
    });
});



module.exports = router;