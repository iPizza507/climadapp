import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Button } from "react-native-elements";
import AsyncStorage from "@react-native-async-storage/async-storage";

import Climas from "./Climas";

export default function Favorites(props) {
  function mostrarc() {}
  const [info, setInfo] = useState(null);

  useEffect(async () => {
    const varts = await AsyncStorage.getItem("listaClimas");
    setInfo(varts);

    return () => {};
  }, []);

  return (
    <View style={styles.fondo}>
      <Text>Entramos a Favorites</Text>
      <Button title="Obtener Clima" onPress={() => console.log(info)} />
    </View>
  );
}

const styles = StyleSheet.create({
  fondo: {
    backgroundColor: "#c2f4ff",
    height: "100%",
  },
});
