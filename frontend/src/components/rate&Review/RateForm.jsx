import React, { useEffect, useState } from "react";
import ReactStars from "react-rating-stars-component";
import axios from "axios";
import swal from 'sweetalert';

const RateForm = () => {
  const [rateValue, setRateValue] = useState();
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

  const submitData = async (event)=>{
    event.preventDefault();

    if(rateValue != null){
      const reviewData = {
        rate: rateValue,
        reviews: review
      }
      const response = await axios.post("http://localhost:8079/review/addReview", reviewData, {
        withCredentials: true
      });
      if(response.status === 201){
        swal({
          title: "SuccessFul",
          text: "Rate and Review was added Sucessfully",
          icon: "success"
        });
      }else{
        swal({
          title: "Error",
          text: "Rate posting failed",
          icon: "error"
        });
      }
    }else{
      console.log("Rate cannot be null");
      swal({
        title: "Invalid",
        text: "Rate is Required. Please select from stars",
        icon: "warning"
      });
    }
  };

  return(
    <div class="m-5 p-5">
      <h2 id="rateType" className="px-3">Product rate</h2>
      <p id="rateValue"></p>
      <form onSubmit={submitData}>
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