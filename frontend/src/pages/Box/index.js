import React, { useState, useEffect } from "react";
import api from "../../services/api.js";
import socket from "socket.io-client";
import Dropzone from "react-dropzone";
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

    fetchFiles().then(b => setBox(b));
  }, []);

  const subscribeNewFiles = boxId => {
    const io = socket("http://localhost:4500");

    io.emit("connectRoom", boxId);

    io.on("file", data => {
      setBox({ ...box, files: [...box.files, data] });
    });
  };

  const onUploadFile = files => {
    files.forEach(file => {
      const data = new FormData();
      data.append("file", file);

      api.post(`boxes/${box._id}/files`, data);
    });
  };

  const renderListFile = () => {
    if (!box || !box.files) return <h3>No files found in this box.</h3>;

    subscribeNewFiles(box._id);
    return box.files.map(file => (
      <li key={file._id}>
        <a
          className="fileInfo"
          href={file.url}
          target="_blank"
          rel="noopener noreferrer"
        >
          <MdInsertDriveFile size={24} color="#a5cfff" />
          <strong>{file.title}</strong>
        </a>
        <span>
          {distanceInWords(file.createdAt, new Date(), {
            locale: en
          })}{" "}
          ago
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
      <Dropzone onDropAccepted={onUploadFile}>
        {({ getRootProps, getInputProps }) => (
          <div className="upload" {...getRootProps()}>
            <input {...getInputProps()} />
            <p>Drag and drop files here.</p>
          </div>
        )}
      </Dropzone>
      <ul>{renderListFile()}</ul>
    </div>
  );
};

export default Box;
