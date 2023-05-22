import React, { useEffect, useRef, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import "./Gigs.scss";
import GigCard from '../../components/gigcard/GigCard'
import { useLocation } from "react-router";

const Gigs = () => {
  const [open, setopen] = useState(false);
  const [value, setvalue] = useState("sales");
  const minRef=useRef();
  const maxRef=useRef();
  const {search}=useLocation()


   //react query 

   const { isPending, error, data ,refetch} = useQuery({
    queryKey: ['gigs'],
    queryFn: () =>
      fetch(`http://localhost:8000/api/gigs?${search}&min=${minRef.current.value}&max=${maxRef.current.value}&sort=${value}`).then(
        (res) => res.json(),
      ),
   })

 

   console.log(data);
   
  const resort = (values) => {
    setvalue(values);
    setopen(false);
  };

  useEffect(() => {
    refetch();
  }, [value]);

  
  const apply = () => {
    refetch();
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
            <input ref={minRef} type="number" placeholder="min" />
            <input ref={maxRef} type="number" placeholder="max" />
            <button onClick={apply}>Apply</button>
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
          {isPending?"loading":error?"something went wrong":data.map(gig=>(
            <GigCard item={gig} key={gig._id}/>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Gigs;
