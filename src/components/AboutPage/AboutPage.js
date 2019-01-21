import React from 'react';
import './AboutPage.css';

   
  class AboutPage extends React.Component {
    render () {
      return(
        <center>
        <div className="root-box">
          <h3 className="term">Terminology</h3>
          <h4>Copay: Small fee you pay at your doctor visit at the time of service. </h4>
          <p>Example: General doctor visit are $25, specialist visits are $35, and if you go out-of-network your copay will be $45. (Varies by health insurance plan)</p>
          <h4>Coinsurance: Percentage amount of covered services you are responsible for after your deductible has been satisfied. </h4>
          <p>Example: Plan coinsurance percentage is 80/20 – you are responsible for 20% and health plan is responsible for 80%. You pay 20% of your healthcare cost until you reach your out-of-pocket max.</p>
          <h4>Deductible: Amount you pay before your health plan starts to pay.</h4>
          <p>You have a $2500 deductible, after you pay the $2500 amount your plan will cover the health services only up to your coinsurance amount.</p>
          <h4>Out-of-pocket maximum: Amount you pay after both your deductible and coinsurance has been satisfied. Once this amount is met and your health plan will cover the rest of your services in network.</h4>
          <p>You have a $5000 out-of-pocket maximum, once you paid up to this amount your health plan will cover the rest services at 100% (varies by insurance plan).</p>
        </div>
        </center>
      )
    }
  }


export default AboutPage;
