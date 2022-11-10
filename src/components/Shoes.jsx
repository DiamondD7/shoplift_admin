import React, { useState, useEffect } from "react";
import { Pen, Trash } from "phosphor-react";

const Shoes = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/shoes/")
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
            <th>Image</th>
            <th>Name</th>
            <th>Price</th>
            <th>Dimensions</th>
            <th>Color</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {items.map((i, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>
                <img className="image" src={i.productImage} />
              </td>
              <td>{i.productName}</td>
              <td>{i.productPrice}</td>
              <td>{i.productDimensions}</td>
              <td>{i.productColor}</td>
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

export default Shoes;
