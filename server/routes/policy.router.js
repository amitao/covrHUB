const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');


// GET POLICY with JOIN tables
router.get('/:id', rejectUnauthenticated, (req, res) => {
  const queryString = `SELECT 
                      "policy"."id",
                      "policy"."policy_holder",
                      "policy"."employment",	
                      "policy"."effective_date", 
                      "policy"."term_date",
                      "policy"."cob_type",
                      "policy"."member_number",
                      "policy"."group_number",
                      "policy"."deductible_in",
                      "policy"."deductible_out",
                      "policy"."coinsurance_in", 
                      "policy"."coinsurance_out",
                      "policy"."copay_in", 
                      "policy"."copay_special",
                      "policy"."out_of_pocket_in",
                      "policy"."out_of_pocket_out",
                      "policy"."insurance_id",
                      "insurance"."name",
                      "insurance"."claims_address", 
                      "insurance"."member_service_phone",                      
                      "benefitpaid"."policy_id",         
                      "benefitpaid"."ded_in_paid",
                      "benefitpaid"."ded_out_paid",
                      "benefitpaid"."oop_in_paid",
                      "benefitpaid"."oop_out_paid",
                      "benefitpaid"."date"
                      FROM "policy"
                      LEFT OUTER JOIN "benefitpaid" ON "benefitpaid"."policy_id"="policy"."id" 
                      LEFT OUTER JOIN "insurance" ON "insurance"."id"="policy"."insurance_id"
                      WHERE "policy"."person_id"= $1;`;
  pool.query(queryString, [req.user.id])
    .then(result => {
      // res.send(result.rows);
      res.send(result.rows);
    })
    .catch(err => {
      console.log(`Error in getting data from DB ${err}`);
      res.sendStatus(500);
    });
});

// NATURAL JOIN "insurance" ON "insurance"."id"="policy"."insurance_id"
// NATURAL JOIN "benefitpaid" ON "benefitpaid"."policy_id"="policy"."id"

router.post('/', rejectUnauthenticated, (req, res) => {
  console.log(`send date to POST in policy table - ${req.body}`);

  let queryString = `INSERT INTO "policy" (
                    "policyHolder"                      
                    "employment",
                    "member_number",
                    "group_number",
                    "effective_date", 
                    "term_date",
                    "cob_type",
                    "deductible_in",
                    "deductible_out",
                    "coinsurance_in", 
                    "coinsurance_out",
                    "copay_in", 
                    "copay_special",
                    "out_of_pocket_in",
                    "out_of_pocket_out",
                    "person_id",
                    "insurance_id")
                    VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17) RETURNING "id";`;

  let queryValues = [ req.body.policy_holder,
                      req.body.employment,
                      req.body.memberNumber,
                      req.body.groupNumber,
                      req.body.effectiveDate,
                      req.body.termDate,
                      req.body.cobType,
                      req.body.dedIn,
                      req.body.dedOut,
                      req.body.coInsuranceIn,
                      req.body.coInsuranceOut,
                      req.body.copayIn,
                      req.body.copaySpecial,
                      req.body.oopIn,
                      req.body.oopOut,
                      req.user.id,
                      req.body.insurance_id];
  pool.query(queryString, queryValues)
    .then(() => {
      res.sendStatus(201);
    })
    .catch(err => {
      console.log(`Error in POSTING data to "policy" table: ${err}`);
      res.sendStatus(500);
    })
})



// UPDATE policy table with insurance Id 
router.put('/:policyId', rejectUnauthenticated, (req, res) => {
  let insId = req.body.insuranceId;
  let policyId = req.params.policyId;

  console.log(`in SERVER - insurance ID is: ${req.body.insuranceId}`)
  console.log(`in SERVER - policy ID is: ${req.params.policyId}`);

  let sqlText = `UPDATE "policy" SET "insurance_id" = $1
                WHERE "id" = $2;`;
  pool.query(sqlText, [insId, policyId])
    .then(result => {
      res.sendStatus(201);
    }).catch(err => {
      console.log('error updating favorite:', err);
      res.sendStatus(200);
    })
});



// delete a policy
router.delete('/:id', rejectUnauthenticated, (req, res) => {
  let queryString = `DELETE FROM "policy" WHERE "id"=$1;`;
  pool.query(queryString, [req.params.id])
    .then( () => {
      res.sendStatus(200);
    })
    .catch(err => {
      console.log('ERROR deleting in DB:', err);
      res.sendStatus(500)
    })
});



// GET paid benefits
// router.get('/benefitPaid/:id', (req, res) => {
//   const queryString = `SELECT * FROM "benefitpaid" WHERE "person_id" = $1;`;
//   pool.query(queryString, [req.user.id])
//     .then(result => {
//       res.send(result.rows);
//     })
//     .catch(err => {
//       console.log(`Error in getting data from DB ${err}`);
//       res.sendStatus(500);
//     });
// })


//POST benefit paid
router.post('/benefitPaid', (req, res) => {

  console.log(`POSTing into benefitpaid ${req.body.policy_id}`);
  
  const queryString = `INSERT INTO "benefitpaid" (
                      "ded_in_paid", 
                      "ded_out_paid", 
                      "oop_in_paid", 
                      "oop_out_paid", 
                      "date", 
                      "person_id", 
                      "policy_id") 
                      VALUES ($1,$2,$3,$4,$5,$6,$7);`

  const queryValues = [req.body.dedInPaid, 
                      req.body.dedOutPaid, 
                      req.body.oopInPaid, 
                      req.body.oopOutPaid, 
                      req.body.date, 
                      req.user.id, 
                      req.body.policy_id];

  pool.query(queryString, queryValues)
    .then(() => {
      res.sendStatus(201);
    })
    .catch(err => {
      console.log(`Error in posting benefitPaid to DB ${err}`);
      res.sendStatus(500);
    })

})






module.exports = router;