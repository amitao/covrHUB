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
                    "policy_holder",                      
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
                    VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17);`;

  let queryValues = [ req.body.policyHolder,
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
// router.put('/:policyId', rejectUnauthenticated, (req, res) => {
//   let insId = req.body.insuranceId;
//   let policyId = req.params.policyId;

//   console.log(`in SERVER - insurance ID is: ${req.body.insuranceId}`)
//   console.log(`in SERVER - policy ID is: ${req.params.policyId}`);

//   let queryString = `UPDATE "policy" SET "insurance_id" = $1
//                      WHERE "id" = $2;`;
//   pool.query(queryString, [insId, policyId])
//     .then(result => {
//       res.sendStatus(201);
//     }).catch(err => {
//       console.log('error updating favorite:', err);
//       res.sendStatus(200);
//     })
// });

router.put('/:id', rejectUnauthenticated, (req, res) => {
  console.log(`in PUT route: ${req.params.id}`);
 
  const queryString = `UPDATE "policy" SET                     
                      "member_number"=$1,
                      "group_number"=$2,
                      "cob_type"=$3,
                      "effective_date"=$4, 
                      "term_date"=$5,
                      "deductible_in"=$6,
                      "deductible_out"=$7,
                      "copay_in"=$8, 
                      "copay_special"=$9,
                      "coinsurance_in"=$10, 
                      "coinsurance_out"=$11,
                      "out_of_pocket_in"=$12,
                      "out_of_pocket_out"=$13
                      WHERE "id"=$14;`;

  const queryValues = [req.body.memberNumber,
                        req.body.groupNumber,
                        req.body.cobType,
                        req.body.effectiveDate,
                        req.body.termDate,
                        req.body.dedIn,
                        req.body.dedOut,
                        req.body.copayIn,
                        req.body.copaySpecial,
                        req.body.coInsuranceIn,
                        req.body.coInsuranceOut,
                        req.body.oopIn,
                        req.body.oopOut,
                        req.params.id]

  pool.query(queryString, queryValues)
      .then ( () => {
        res.sendStatus(200)
      })
      .catch ( err => {
        console.log(`Error updating profile`);
        res.sendStatus(500)
      })
})

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


//////////////////////////////////////////////////////////////////

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
                      VALUES ($1,$2,$3,$4,$5,$6,$7) RETURNING "id";`

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

router.get('/benefitPaid/:id', rejectUnauthenticated, (req, res) => {

  const queryString = `SELECT * FROM "benefitpaid" WHERE "id"=$1;`;
  
  pool.query(queryString, [req.params.id])
    .then(result => {
      res.send(result.rows);
    })
    .catch(err => {
      console.log(`Error in getting benefitpaid data from DB ${err}`);
      res.sendStatus(500);
    });
});





module.exports = router;