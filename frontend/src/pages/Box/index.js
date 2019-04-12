import React, { useState, useEffect } from "react";
import api from "../../services/api.js";
import { distanceInWords } from "date-fns";
import en from "date-fns/locale/en";
import logo from "../../assets/logo.svg";
import "./styles.css";
import { MdInsertDriveFile } from "react-icons/md";
const Box = props => {
  const [box, setBox] = useState(null);

  useEffect(() => {
    const fetchFiles = async () => {
      const boxId = props.match.params.id;
      const response = await api.get(`boxes/${boxId}`);

      return response.data;
    };

    fetchFiles().then(res => setBox(res));
  }, []);

  const renderListFile = () => {
    console.log(box);

    if (!box || !box.files) return <h3>No files found in this box.</h3>;

    return box.files.map(file => (
      <li key={file._id}>
        <a className="fileInfo" href={file.url} target="_blank">
          <MdInsertDriveFile size={24} color="#a5cfff" />
          <strong>{file.title}</strong>
        </a>
        <span>
          {distanceInWords(file.createdAt, new Date(), {
            locale: en
          })} {" "} ago
        </span>
      </li>
    ));
  };

  return (
    <div id="box-container">
      <header>
        <img src={logo} alt="" />
        <h1>Rocketseat</h1>
      </header>
      <ul>{renderListFile()}</ul>
    </div>
  );
};

export default Box;
