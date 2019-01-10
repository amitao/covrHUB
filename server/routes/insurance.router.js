const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');


// get data from the demographic table to render to DOM
// demographic Saga and Reducer
router.get('/:id', rejectUnauthenticated, (req, res) => {
  const queryString = `SELECT * FROM "insurance" WHERE "person_id" = $1;`;
  pool.query(queryString, [req.params.id])
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
                      VALUES ($1,$2,$3,$4,$5,$6,$7) RETURNING "id";`;
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


/////////////////////// GET Benefit //////////////////////////////////
router.get('/benefits/:id', rejectUnauthenticated, (req, res) => {
  console.log(req.params.id);

  const queryString = `SELECT * FROM "benefit" 
                        JOIN "insurance" ON "benefit"."id" = "insurance"."benefit_id"
                        WHERE "benefit"."id"=$1;`;
  pool.query(queryString, [req.params.id])
    .then(result => {
      res.send(result.rows);
    })
    .catch(err => {
      console.log(`Error in getting data from DB ${err}`);
      res.sendStatus(500);
    });
});


router.post('/benefits', rejectUnauthenticated, (req, res) => {
  console.log(`in POST route to add post to db ${req.user}`);

  const queryString = `INSERT INTO "benefit" ("deductible_in", "deductible_out", "coinsurance_in", 
                      "coinsurance_out", "copay_in", "copay_special", "oop_in", "oop_out", "insurance_id")
                      VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9);`;

  const queryValues = [req.body.dedIn, req.body.dedOut, req.body.coinsuranceIn, req.body.coinsuranceOut,
  req.body.copayPCP, req.body.copaySpecial, req.body.oopIn, req.body.oopOut, req.body.insurance_id];
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

router.post('/benefits/paid', rejectUnauthenticated, (req, res) => {
  const queryString = `INSERT INTO "benefitpaid" ("ded_in_paid", "ded_out_paid", "oop_in_paid", "oop_out_paid", "date", "benefit_id") 
                        VALUES ($1,$2,$3,$4,$5, (SELECT "id" FROM "benefit")) RETURNING "id";`

  const queryValues = [req.body.dedInPaid, req.body.dedOutPaid, req.body.oopInPaid, req.body.oopOutPaid, req.body.date];
  pool.query(queryString, queryValues)
    .then(() => {
      res.sendStatus(201);
    })
    .catch(err => {
      console.log(`Error in posting insurance to DB ${err}`);
      res.sendStatus(500);
    })
})


router.get('/benefits/paid/:id', rejectUnauthenticated, (req, res) => {
  console.log('hitting paid beneefit get request?');
  const queryString = `SELECT * FROM "benefitpaid" WHERE "benefit_id"="id"; `;
  pool.query(queryString, [req.params.id])
    .then(result => {
      console.log(result.rows);
      res.send(result.rows);
    })
    .catch(err => {
      console.log(`Error in getting data from DB ${err}`);
      res.sendStatus(500);
    });
});


module.exports = router;