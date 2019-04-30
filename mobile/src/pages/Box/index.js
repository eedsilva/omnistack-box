import React, { useState, useEffect } from "react";
import { View, Text, FlatList, TouchableOpacity } from "react-native";
import styles from "./styles";
import AsyncStorage from "@react-native-community/async-storage";
import api from "../../services/api";
import Icon from "react-native-vector-icons/MaterialIcons";
import { distanceInWords } from "date-fns";
import en from "date-fns/locale/en";

const Box = () => {
  const [box, setBox] = useState({});

  useEffect(() => {
    const fetchFiles = async () => {
      const boxId = await AsyncStorage.getItem("@RocketBox:box");
      const response = await api.get(`boxes/${boxId}`);

      return response.data;
    };

    fetchFiles().then(b => setBox(b));
  }, []);

  onUpload = () => {

  }

  renderItem = ({item}) => (
    <TouchableOpacity onPress={() => {}} style={styles.file}>
      <View style={styles.fileInfo}>
        <Icon name="insert-drive-file" size={24} color="#A5CFFF" />
        <Text style={styles.fileTitle}>{item.title}</Text>
      </View>

      <Text style={styles.fileDate}>
        {distanceInWords(item.createdAt, new Date(), {
          locale: en
        })}
        {" "} ago
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
