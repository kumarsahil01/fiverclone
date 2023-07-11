import React from "react";
import "./Review.scss";
import { useQuery } from "@tanstack/react-query";
import newRequest from "../../utils/newRequest.js";
const Review= ({review}) => {
  const { isPending, error, data } = useQuery({
    queryKey: [review.userId],
    queryFn: () =>
      fetch(`http://localhost:8000/api/users/${review.userId}`).then((res) =>
        res.json()
      ),
  });
  return (
    
    <div className="item">
    {isPending?"Loading"?error:"something went wrong":<div className="user">
    { data && data.img && <img
        className="pp"
        src={data.img||"https://images.pexels.com/photos/839586/pexels-photo-839586.jpeg?auto=compress&cs=tinysrgb&w=1600"
        }
      />}
      <div className="info">
        <span>{data.username}</span>
        <div className="country">
        
          <span>{data.country}</span>
        </div>
      </div>
    </div>}
     
      <div className="stars">
      {Array(review.star)
          .fill()
          .map((item, i) => (
            <img src="/img/star.png" alt="" key={i} />
          ))}
        <span>{review.star}</span>
      </div>
    
    <p>
      {review.desc}
    </p>
    <div className="helpful">
      <span>Helpful?</span>
      <img src="/img/like.png" alt="" />
      <span>Yes</span>
      <img src="/img/dislike.png" alt="" />
      <span>No</span>
    </div>
  </div>

 


  );
};

export default Review;
