import React from "react";
import { Link } from "react-router-dom";
import "./Orders.scss";
import {useQuery} from "@tanstack/react-query"
import axios from "axios";

const Orders = () => {
  

  const { isPending, error, data } = useQuery({
    queryKey: ["orders"],
    queryFn: () =>
      fetch(`http://localhost:8000/api/orders`).then((res) =>
        res.json()
      ),
  });
  const currentuser = JSON.parse(localStorage.getItem("currentUser"));

  const handleContact = async (order) => {
    const sellerId = order.sellerId;
    const buyerId = order.buyerId;
    const id = sellerId + buyerId;

    try {
      const res = await axios.get(`http://localhost:8000/api/conversations/single/${id}`);
      navigate(`/message/${res.data.id}`);
    } catch (err) {
      if (err.response.status === 404) {
        const res = await axios.post(`http://localhost:8000/api/conversations/`, {
          to: currentuser.seller ? buyerId : sellerId,
        });
        navigate(`/message/${res.data.id}`);
      }
    }
  };
  return (
    <div className="orders">
    { isPending?"Loading.."?error:"Something went wrong": <div className="container">
        <div className="title">
          <h1>Orders</h1>
        </div>
        <table>
          <tr>
            <th>Image</th>
            <th>Title</th>
            <th>Price</th>
            
            <th>Contact</th>
          </tr>
          {data.map((order)=>(
                <tr key={order._id}>
                <td>
                  <img
                    className="image"
                    src={order.img}
                  />
                </td>
                <td>{order.title}</td>
                <td>{order.price}</td>
                <td>
                  <img
                    className="message"
                    src="./img/message.png"
                    alt=""
                    onClick={() => handleContact(order)}
                  />
                </td>
              </tr>
          ))}
         
        
        </table>
      </div>}
    </div>
  );
};

export default Orders;