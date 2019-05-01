import React, { useState, useEffect } from "react";
import { View, Text, FlatList, TouchableOpacity } from "react-native";
import styles from "./styles";
import AsyncStorage from "@react-native-community/async-storage";
import api from "../../services/api";
import Icon from "react-native-vector-icons/MaterialIcons";
import { distanceInWords } from "date-fns";
import en from "date-fns/locale/en";
import ImagePicker from "react-native-image-picker";
import RNFS from "react-native-fs";
import FileViewer from "react-native-file-viewer";
import socket from "socket.io-client";

const Box = () => {
  const [box, setBox] = useState({});

  useEffect(() => {
    const fetchFiles = async () => {
      const boxId = await AsyncStorage.getItem("@RocketBox:box");
      const response = await api.get(`boxes/${boxId}`);

      return response.data;
    };

    fetchFiles().then(b => {
        setBox(b);
        subscribeNewFiles(b);
    });
  }, []);

  const subscribeNewFiles = b => {
    const io = socket("http://10.0.0.191:4500");

    io.emit("connectRoom", b._id);

    io.on("file", data => { 
      setBox({ ...b, files: [...b.files, data] });
    });
  };

  onOpenFile = async file => {
    try {
      const filePath = `${RNFS.DocumentDirectoryPath}/${file.title}`;
      //local ip is needed for android
      const url = file.url.replace("localhost", "10.0.0.191");
      
      await RNFS.downloadFile({
        fromUrl: url,
        toFile: filePath
      });
      
      await FileViewer.open(filePath);
    } catch (error) {
      console.log("file not supported");
    }
  };

  onUpload = () => {
    ImagePicker.launchImageLibrary({}, uploadFile => {
      if (uploadFile.error) console.log("error: something went wrong");
      else if (uploadFile.didCancel) console.log("user canceled file upload.");
      else {
        const data = new FormData();
        /* 
            ios changes image file extension to heic.
            this validation is needed only for ios.
        */
        const [fileName, extension] = uploadFile.fileName.split(".");
        const ext = extension === "heic" ? "jpg" : extension;

        data.append("file", {
          uri: uploadFile.uri,
          type: uploadFile.type,
          name: `${fileName}.${ext}`
        });

        api.post(`boxes/${box._id}/files`, data);
      }
    });
  };

  renderItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => onOpenFile(item)}
      style={styles.file}
    >
      <View style={styles.fileInfo}>
        <Icon name="insert-drive-file" size={24} color="#A5CFFF" />
        <Text style={styles.fileTitle}>{item.title}</Text>
      </View>

      <Text style={styles.fileDate}>
        {distanceInWords(item.createdAt, new Date(), {
          locale: en
        })}{" "}
        ago
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.boxTitle}>{box.title}</Text>
      <FlatList
        data={box.files}
        keyExtractor={file => file._id}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        renderItem={renderItem}
      />

      <TouchableOpacity style={styles.fab} onPress={onUpload}>
        <Icon name="cloud-upload" size={24} color="#FFF" />
      </TouchableOpacity>
    </View>
  );
};

export default Box;
