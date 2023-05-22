import React from "react";
import "./GigCard.scss";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
const GigCard = ({ item }) => {

  const { isPending, error, data ,refetch} = useQuery({
    queryKey: [`${item.userId}`],
    queryFn: () =>
      fetch(`http://localhost:8000/api/users/${item.userId}`).then(
        (res) => res.json(),
      ),
   })

  return (
    <Link to={`/gig/${item._id}`} className="link">
      <div className="gigCard">
        <img src={item.cover} alt="" />
        <div className="info">
            {isPending?"loading..":error?"something went wrong":(<div className="user">
            <img src={data.img|| "https://fiverr-res.cloudinary.com/t_profile_original,q_auto,f_auto/attachments/profile/photo/e029a900e8118d4e774f246205153514-1652427312267/755fb432-b2fa-467d-9ef6-d1b4be1096a4.jpg"} alt="" />
          <span>{data.username}</span>
            </div>)}
            <p>{item.desc}</p>
            <div className="star">
                <img src='./img/star.png' alt="" />
                <span>{!isNaN(item.totalStars/item.starNumber) &&Math.round(item.totalStars/item.starNumber)}</span>
            </div>
         
        </div>
        <hr />
        <div className="details">
          <img src="#" alt="" />
          <div className="price">
          <span>STARTING AT</span>
          <h2>${item.price}</h2>
          </div>
          
        </div>
      </div>
    </Link>
  );
};

export default GigCard;
