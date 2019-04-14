import React, { Component } from "react";
import { View, Text, Image, TextInput, TouchableOpacity } from "react-native";
import api from "../../services/api";
import styles from "./styles";
import logo from "../../assets/logo.png";

export default class Main extends Component {
  state = {
    boxTitle: ""
  };

  onSignIn = async () => {};

  onCreatePress = async () => {
    const response = await api.post("boxes", {
      title: this.state.boxTitle
    });

    console.log(response);
    

    this.props.navigation.navigate("Box");
  };

  render() {
    return (
      <View style={styles.container}>
        <Image style={styles.logo} source={logo} />

        <TextInput
          style={styles.input}
          placeholder="Create a box"
          placeholderTextColor="#999"
          autoCapitalize="none"
          autoCorrect={false}
          underlineColorAndroid="transparent"
          value={this.state.boxTitle}
          onChangeText={text => this.setState({ boxTitle: text })}
        />

        <TouchableOpacity onPress={this.onCreatePress} style={styles.button}>
          <Text style={styles.buttonText}>Create</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
