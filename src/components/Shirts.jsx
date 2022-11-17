import React, { useState, useEffect } from "react";
import { Pen, Trash } from "phosphor-react";

const Shirts = () => {
  const [items, setItems] = useState([]);
  const [itemLoaded, setItemLoaded] = useState(false);
  const [addOpenModal, setAddOpenModal] = useState(false);
  const [updateOpenModal, setUpdateOpenModal] = useState(false);
  const [deleteOpenModal, setDeleteOpenModal] = useState(false);
  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productDimensions, setProductDimensions] = useState("");
  const [productColor, setProductColor] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [productImage, setProductImage] = useState("");
  const [productID, setProductID] = useState("");

  useEffect(() => {
    fetch("https://shopliftserver.azurewebsites.net/shirt/")
      .then((res) => res.json())
      .then((data) => {
        setItems(data);
        setItemLoaded(true);
        console.log(data);
      });
  }, []);

  const addModalOpen = () => {
    setAddOpenModal(true);
  };

  const deleteModalOpen = (i) => {
    setDeleteOpenModal(true);
    setProductID(i._id);
  };

  const updateModalOpen = (i) => {
    setUpdateOpenModal(true);
    setProductName(i.productName);
    setProductPrice(i.productPrice);
    setProductDimensions(i.productDimensions);
    setProductColor(i.productColor);
    setProductDescription(i.productDescription);
    setProductImage(i.productImage);
    setProductID(i._id);
  };

  const updateData = (id) => {
    fetch("https://shopliftserver.azurewebsites.net/shirt/edit/" + id, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        productName: productName,
        productPrice: productPrice,
        productColor: productColor,
        productDescription: productDescription,
        productDimensions: productDimensions,
        productImage: productImage,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Updated", data);
      });
  };

  const deleteData = (id) => {
    fetch("https://shopliftserver.azurewebsites.net/shirt/delete/" + id, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        setItems(data);
      });
    window.location.reload();
  };

  const addData = () => {
    fetch("https://shopliftserver.azurewebsites.net/shirt/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        productName: productName,
        productPrice: productPrice,
        productColor: productColor,
        productDescription: productDescription,
        productDimensions: productDimensions,
        productImage: productImage,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setItems(data);
      });
  };
  return (
    <div>
      {itemLoaded === true ? (
        <div>
          <button className="btn-add" onClick={addModalOpen}>
            Add
          </button>
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
                    <button
                      className="edit-btn"
                      onClick={() => updateModalOpen(i)}
                    >
                      <Pen size={32} color={"Orange"} />
                    </button>
                    <button
                      className="delete-btn"
                      onClick={() => deleteModalOpen(i)}
                    >
                      <Trash size={32} color={"red"} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {updateOpenModal || deleteOpenModal || addOpenModal ? (
            <div className="Modal">
              {deleteOpenModal ? (
                <div className="delete-div">
                  <h2 className="delete-statement">
                    Are you sure you want to delete?
                  </h2>
                  <p className="emoji">¯\_( ͡° ͜ʖ ͡°)_/¯</p>
                  <div className="delete-btns">
                    <button
                      className="btn-no"
                      onClick={() => setDeleteOpenModal(false)}
                    >
                      No
                    </button>
                    <button
                      className="btn-delete"
                      onClick={() => deleteData(productID)}
                    >
                      Yes
                    </button>
                  </div>
                </div>
              ) : (
                ""
              )}
              {updateOpenModal || addOpenModal ? (
                <form
                  className="modal-form"
                  onSubmit={
                    updateOpenModal === true ? updateData(productID) : addData
                  }
                >
                  <h1>{updateOpenModal ? "Edit" : "Add"}</h1>
                  <label className="form-label">Product Name</label>
                  <br />
                  <input
                    className="modal-input"
                    type="text"
                    value={productName}
                    onChange={(e) => setProductName(e.target.value)}
                  />
                  <br />
                  <label className="form-label">Product's Price</label>
                  <br />
                  <input
                    className="modal-input"
                    type="text"
                    value={productPrice}
                    onChange={(e) => setProductPrice(e.target.value)}
                  />
                  <br />
                  <label className="form-label">Product's Dimensions</label>
                  <br />
                  <input
                    className="modal-input"
                    type="text"
                    value={productDimensions}
                    onChange={(e) => setProductDimensions(e.target.value)}
                  />
                  <br />
                  <label className="form-label">Product's Color</label>
                  <br />
                  <input
                    className="modal-input"
                    type="text"
                    value={productColor}
                    onChange={(e) => setProductColor(e.target.value)}
                  />
                  <br />

                  <label className="form-label">Image link</label>
                  <br />
                  <input
                    className="modal-input"
                    type="text"
                    value={productImage}
                    onChange={(e) => setProductImage(e.target.value)}
                  />
                  <br />
                  <label className="form-label">Description</label>
                  <br />
                  <textarea
                    className="modal-description-input"
                    type="text"
                    value={productDescription}
                    onChange={(e) => setProductDescription(e.target.value)}
                  ></textarea>

                  <div className="btns-div">
                    <button
                      className="btn-cancel"
                      onClick={
                        updateOpenModal
                          ? () => setUpdateOpenModal(false)
                          : () => setAddOpenModal(false)
                      }
                    >
                      Cancel
                    </button>
                    <button className="btn-update">
                      {updateOpenModal ? "Update" : "Add"}
                    </button>
                  </div>
                </form>
              ) : (
                ""
              )}
            </div>
          ) : (
            ""
          )}
        </div>
      ) : (
        <div className="loading">
          <p>Loading...</p>
        </div>
      )}
    </div>
  );
};

export default Shirts;
