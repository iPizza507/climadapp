import React, { useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import { Icon, Overlay, Chip } from "react-native-elements";

export default function Welcome() {
  const [visible, setVisible] = useState(false);

  const toggleOverlay = () => {
    setVisible(!visible);
  };
  return (
    <View style={styles.container}>
      <Icon
        type="material-community"
        name="cloud-outline"
        iconStyle={styles.cloudStyle}
      />
      <Chip
        title="Bienvenidos"
        buttonStyle={styles.btnWelcome}
        onPress={toggleOverlay}
      />
      <Overlay
        isVisible={visible}
        onPress={toggleOverlay}
        overlayStyle={styles.overlayCenter}
      >
        <Text>Bienvenidos a la aplicacion del clima</Text>
        <Text>Donde podran consultar la temperatura, clima, etc</Text>
        <Text>en cada localidad del mundo!</Text>
        <Chip
          title="Close"
          buttonStyle={styles.btnClose}
          onPress={toggleOverlay}
        />
      </Overlay>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#c2f4ff",
    alignItems: "center",
    justifyContent: "center",
  },
  btnWelcome: {
    backgroundColor: "#03e3fc",
    width: 150,
    height: 50,
  },
  cloudStyle: {
    width: "100%",
    height: 200,
    fontSize: 200,
    marginBottom: 50,
  },
  btnClose: {
    backgroundColor: "#03e3fc",
    width: 100,
    height: 40,
  },
  overlayCenter: {
    alignItems: "center",
  },
});
