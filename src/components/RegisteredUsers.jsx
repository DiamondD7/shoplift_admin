import React, { useState, useEffect } from "react";
import { Pen, Trash } from "phosphor-react";
import "../tablestyle.css";

const RegisteredUsers = () => {
  const [items, setItems] = useState([]);
  const [addOpenModal, setAddOpenModal] = useState(false);
  const [updateOpenModal, setUpdateOpenModal] = useState(false);
  const [deleteOpenModal, setDeleteOpenModal] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [username, setUserame] = useState("");
  const [password, setPassword] = useState("");
  const [usersID, setUsersID] = useState("");

  useEffect(() => {
    fetch("http://localhost:5000/users/")
      .then((res) => res.json())
      .then((data) => {
        setItems(data);
        console.log(data);
      });
  }, []);

  const addModalOpen = () => {
    setAddOpenModal(true);
  };

  const deleteModalOpen = (i) => {
    setDeleteOpenModal(true);
    setUsersID(i._id);
  };

  const updateModalOpen = (i) => {
    setUpdateOpenModal(true);
    setFirstName(i.firstName);
    setLastName(i.lastName);
    setEmail(i.email);
    setPhoneNumber(i.phoneNumber);
    setUserame(i.username);
    setPassword(i.password);
    setUsersID(i._id);
  };

  const updateData = (id) => {
    fetch("http://localhost:5000/users/update/" + id, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        firstName: firstName,
        lastName: lastName,
        email: email,
        phoneNumber: phoneNumber,
        username: username,
        password: password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Updated", data);
      });
  };

  const deleteData = (id) => {
    fetch("http://localhost:5000/users/delete/" + id, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        setItems(data);
      });
    window.location.reload();
  };

  const addData = () => {
    fetch("http://localhost:5000/users/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        firstName: firstName,
        lastName: lastName,
        email: email,
        phoneNumber: phoneNumber,
        username: username,
        password: password,
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
      <button className="btn-add" onClick={addModalOpen}>
        Add
      </button>
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
                <button className="edit-btn" onClick={() => updateModalOpen(i)}>
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
                  onClick={() => deleteData(usersID)}
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
                updateOpenModal === true ? updateData(usersID) : addData
              }
            >
              <h1>{updateOpenModal ? "Edit" : "Add"}</h1>
              <label className="form-label">First name</label>
              <br />
              <input
                className="modal-input"
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
              <br />
              <label className="form-label">Last name</label>
              <br />
              <input
                className="modal-input"
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
              <br />
              <label className="form-label">Email</label>
              <br />
              <input
                className="modal-input"
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <br />
              <label className="form-label">Phone number</label>
              <br />
              <input
                className="modal-input"
                type="text"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
              <br />

              <label className="form-label">Username</label>
              <br />
              <input
                className="modal-input"
                type="text"
                value={username}
                onChange={(e) => setUserame(e.target.value)}
              />
              <br />
              <label className="form-label">Password</label>
              <br />
              <input
                className="modal-input"
                type="text"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

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
  );
};

export default RegisteredUsers;
