import React from "react";
import { Link } from "react-router-dom";
import "./Messages.scss";
import { useMutation, useQuery } from "@tanstack/react-query";
import moment from 'moment';
import axios from 'axios'
const Messages = () => {
  const currentuser = JSON.parse(localStorage.getItem("currentUser"));
  

  const { isPending, error, data } = useQuery({
    queryKey: ["conversations"],
    queryFn: () =>
      fetch(`http://localhost:8000/api/conversations`).then((res) => res.json()),
  });
  const mutation = useMutation({
    mutationFn: (id) => {
      return axios.put(`http://localhost:8000/api/conversations/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["conversations"]);
    },
  });

  const handleRead = (id) => {
    mutation.mutate(id);
  };
  return (
    
    <div className="messages">
      {isPending ? (
        "Loading..."
      ) : error ? (
        "something went wrong "
      ) : (
        <div className="container">
          <div className="title">
            <h1>Messages</h1>
          </div>
          <table>
            <tr>
              <th>{currentuser.isSeller ? "Buyer" : "Seller"}</th>
              <th>Last Message</th>
              <th>Date</th>
              <th>Action</th>
            </tr>
            
            {data.map((c) => (
              
              <tr className={
                ((currentuser.isSeller && !c.readBySeller) ||
                  (!currentuser.isSeller && !c.readByBuyer)) &&
                "active"
              } key={c.id}>
                
               <td>{ currentuser.isSeller ? c.buyerId : c.sellerId}</td>
                 
                <td>
                  <Link to={`/message/${c.id}`} className="link">
                    {c?.lastMessage?.substring(0, 100)}
                  </Link>
                </td>
                <td>{moment(c.updatedAt).fromNow()}</td>
                <td>
                {((currentuser.isSeller && !c.readBySeller) ||
                    (!currentuser.isSeller && !c.readByBuyer)) && (
                      <button onClick={() => handleRead(c.id)}>
                      Mark as Read
                    </button>
                  )}
                </td>
              </tr>
              
            ))}
          </table>
        </div>
      )}
    </div>
  );
};

export default Messages;
