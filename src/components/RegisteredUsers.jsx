import React, { useState, useEffect } from "react";
import { Pen, Trash } from "phosphor-react";
import "../tablestyle.css";

const RegisteredUsers = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/users/")
      .then((res) => res.json())
      .then((data) => {
        setItems(data);
        console.log(data);
      });
  }, []);

  return (
    <div>
      <table className="table">
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Username</th>
            <th>Password</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {items.map((i, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>
                {i.firstName} {i.lastName}
              </td>
              <td>{i.email}</td>
              <td>{i.phoneNumber}</td>
              <td>{i.username}</td>
              <td>{i.password}</td>
              <td>
                <button className="edit-btn">
                  <Pen size={32} color={"Orange"} />
                </button>
                <button className="delete-btn">
                  <Trash size={32} color={"red"} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RegisteredUsers;
