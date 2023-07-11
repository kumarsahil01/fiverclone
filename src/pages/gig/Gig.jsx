import React from "react";
import "./Gig.scss";
import { Slider } from "infinite-react-carousel/lib";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";
import Reviews from "../../components/Reviews/Reviews";

function Gig() {
  const { id } = useParams();

  const { isPending, error, data } = useQuery({
    queryKey: ["gig"],
    queryFn: () =>
      fetch(`http://localhost:8000/api/gigs/single/${id}`).then((res) =>
        res.json()
      ),
  });


  const userId=data?.userId;
  const {
    isPending: isuseLoading,
    error: usererror,
    data: userdata,
  } = useQuery({
    queryKey: ["user"],
    queryFn: () =>
      fetch(`http://localhost:8000/api/users/${data.userId}`).then((res) =>
        res.json()
      ),
  enabled:!!userId,
  });
 
  return (
    <div className="gig">
      {isPending ? (
        "Loading.."
      ) : error ? (
        "something went wrong"
      ) : (
        <div className="container">
          <div className="left">
            <span className="breadcrumbs">Liverr Graphics & Design </span>
            <h1>{data.title}</h1>
            {isuseLoading ? (
              "Loading" ? (
                usererror
              ) : (
                "something went wrong"
              )
            ) : (
              <div className="user">
                <img
                  className="pp"
                  src={
                    userdata && userdata.img
                      ? userdata.img
                      : "https://images.pexels.com/photos/720327/pexels-photo-720327.jpeg?auto=compress&cs=tinysrgb&w=1600"
                  }
                  alt=""
                />
                <span>{userdata && userdata.username && userdata.username}</span>
                {!isNaN(data.totalStars / data.starNumber) && (
                  <div className="stars">
                    {Array(Math.round(data.totalStars / data.starNumber))
                      .fill()
                      .map((item, i) => (
                        <img src="/img/star.png" alt="" key={i} />
                      ))}

                    <span>{Math.round(data.totalStars / data.starNumber)}</span>
                  </div>
                )}
              </div>
            )}
            <Slider slidesToShow={1} arrowsScroll={1} className="slider">
              {data &&
                data.images &&
                data.images.map((img) => (
                  <img key={img} src={img} alt="this image does not exist" />
                ))}
            </Slider>

            <h2>About This Gig</h2>
            <p>{ data.desc}</p>
            {isuseLoading ? (
              "Loading" ? (
                usererror
              ) : (
                "something went wrong"
              )
            ) : (
              <div className="seller">
                <h2>About The Seller</h2>
                <div className="user">
                  <img
                    src={
                      userdata && userdata.img
                        ? userdata.img
                        : "https://images.pexels.com/photos/720327/pexels-photo-720327.jpeg?auto=compress&cs=tinysrgb&w=1600"
                    }
                    alt=""
                  />
                  <div className="info">
                    <span>{  userdata && userdata.username && userdata.username}</span>
                    {!isNaN(data.totalStars / data.starNumber) && (
                      <div className="stars">
                        {Array(Math.round(data.totalStars / data.starNumber))
                          .fill()
                          .map((item, i) => (
                            <img src="/img/star.png" alt="" key={i} />
                          ))}

                        <span>
                          {Math.round(data.totalStars / data.starNumber)}
                        </span>
                      </div>
                    )}
                    <button>Contact Me</button>
                  </div>
                </div>
                <div className="box">
                  <div className="items">
                    <div className="item">
                      <span className="title">From</span>
                      <span className="desc">{  userdata && userdata.country && userdata.country}</span>
                    </div>
                    <div className="item">
                      <span className="title">Member since</span>
                      <span className="desc">Aug 2022</span>
                    </div>
                    <div className="item">
                      <span className="title">Avg. response time</span>
                      <span className="desc">4 hours</span>
                    </div>
                    <div className="item">
                      <span className="title">Last delivery</span>
                      <span className="desc">1 day</span>
                    </div>
                    <div className="item">
                      <span className="title">Languages</span>
                      <span className="desc">English</span>
                    </div>
                  </div>
                  <hr />
                  <p>{ userdata && userdata.desc && userdata.desc}</p>
                </div>
              </div>
            )}
         <Reviews gigId={id}/>
          </div>

          <div className="right">
            <div className="price">
              <h3>{data.shortTitle}</h3>
              <h2>$ {data.price}</h2>
            </div>
            <p>{/* {data.shortDesc} */}</p>
            <div className="details">
              <div className="item">
                <img src="/img/clock.png" alt="" />
                <span>{data.deliveryTime} Days Delivery</span>
              </div>
              <div className="item">
                <img src="/img/recycle.png" alt="" />
                <span>{data.revisionNumber} Revisions</span>
              </div>
            </div>
            <div className="features">
              {data &&
                data.features &&
                data.features.map((feature) => (
                  <div className="item">
                    <img src="/img/greencheck.png" alt="" />
                    <span>{feature}</span>
                  </div>
                ))}
            </div>

            <button>Continue</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Gig;
