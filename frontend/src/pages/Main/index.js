import React, { useState } from "react";
import api from "../../services/api.js";
import logo from "../../assets/logo.svg";
import "./styles.css";

const Main = (props) => {
  const [newBox, setNewBox] = useState("");

  const handSubmit = async(arg) => {
    arg.preventDefault();

    const response = await api.post('boxes', {
        title: newBox
    });
    
    props.history.push(`/box/${response.data._id}`);
  }
  
  return (
    <div id="main-container">
      <form action="" onSubmit={handSubmit}>
        <img src={logo} alt="" />
        <input
          placeholder="Create box"
          value={newBox}
          onChange={({ target }) => setNewBox(target.value)}
        />
        <button type="submit" onClick={handSubmit}>Create</button>
      </form>
    </div>
  );
};

export default Main;
