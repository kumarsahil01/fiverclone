import React, { useState } from "react";
import "./Gigs.scss";
import { gigs } from "../../data";
import GigCard from '../../components/gigcard/GigCard'
const Gigs = () => {
  const [open, setopen] = useState(false);
  const [value, setvalue] = useState("sales");

  const resort = (values) => {
    setvalue(values);
    setopen(false);
  };
  return (
    <div className="gigs">
      <div className="container">
        <span className="bredcrumbs">Graphics & Design </span>
        <h1>AI Artists</h1>
        <p>
          Explore the boundaries of art and technology with Fiverr's AI artists
          |
        </p>
        <div className="menu">
          <div className="left">
            <span>Budget</span>
            <input type="text" placeholder="min" />
            <input type="text" placeholder="max" />
            <button>Apply</button>
          </div>
          <div className="right">
            <span className="sortBy">sortBy</span>
            <span className="sortType">
              {value === "sales" ? "Best selling" : "Newest"}
            </span>
            <img src="./img/down.png" alt="" onClick={() => setopen(!open)} />
            {open && (
              <div className="rightMenu">
                {value==='sales'?(<span onClick={() => resort("createdAt")}>Newest</span>):(
                <span onClick={() => resort("sales")}>Best Selling</span>)}
              </div>
            )}
          </div>
        </div>
        <div className="cards">
          {gigs.map(gig=>(
            <GigCard item={gig} key={gig.id}/>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Gigs;
