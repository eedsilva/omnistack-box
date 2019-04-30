import React, { useState, useEffect } from "react";
import { View, Text, FlatList, TouchableOpacity } from "react-native";
import styles from "./styles";
import AsyncStorage from "@react-native-community/async-storage";
import api from "../../services/api";

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

//   renderItem = (item) => (
//     <TouchableOpacity 
//         onPress={()=>{}}
//         style={styles.file}

//     />
//   );

  return (
    <View style={styles.container}>
      <Text style={styles.boxTitle}>{box.title}</Text>
      {/* <FlatList
        data={box.files}
        keyExtractor={file => file._id}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        renderItem={renderItem}
      /> */}
    </View>
  );
};

export default Box;
