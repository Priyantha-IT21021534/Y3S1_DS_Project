import React, { useEffect, useState } from "react";
import ReactStars from "react-rating-stars-component";

const RateForm = () => {
  const [rateValue, setRateValue] = useState(0);
  const [rateType, setRateType] = useState("productId");
  const [review, setReview] = useState("");

  useEffect(()=>{
    document.getElementById("rateValue").innerHTML = 
      `
        Rate for: ${rateType} <br />
        Rating: ${rateValue} <br />
        Review: ${review}
      `;
  },[rateValue, review])

  return(
    <div class="m-5 p-5">
      <h2 id="rateType" className="px-3">Product rate</h2>
      <p id="rateValue"></p>
      <form>
        <ReactStars
          count={5}
          value={rateValue}
          onChange={(value) => setRateValue(value)}
          size={50}
          activeColor="#ffd700"
        /> <br />
        <textarea 
          style={{height: '200px', width: "80%"}}
          onChange={(event) => setReview(event.target.value)}
        /> <br />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
export default RateForm;