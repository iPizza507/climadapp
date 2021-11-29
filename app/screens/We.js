import React from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  SectionList,
  StatusBar,
} from "react-native";

export default function We() {
  const DATA = [
    {
      title: "Nombres de los integrantes",
      data: ["Figueroa Ian", "Español Yamil"],
    },
  ];

  const Item = ({ title }) => (
    <View style={styles.item}>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
  return (
    <View style={styles.fondo}>
      <Text style={styles.titulo}>¿Quienes somos?</Text>
      <Text style={styles.subTitulo}>
        Somos una empresa dedicada a resolver las dudas sobre la temeperatura.
      </Text>
      <SafeAreaView style={styles.container}>
        <SectionList
          sections={DATA}
          keyExtractor={(item, index) => item + index}
          renderItem={({ item }) => <Item title={item} />}
          renderSectionHeader={({ section: { title } }) => (
            <Text style={styles.header}>{title}</Text>
          )}
        />
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  titulo: {
    textAlign: "center",
    fontSize: 30,
    fontStyle: "italic",
    fontWeight: "bold",
  },
  fondo: {
    backgroundColor: "#c2f4ff",
    height: "100%",
  },
  subTitulo: {
    marginLeft: 20,
    marginRight: 20,
    marginTop: 20,
  },

  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
    marginHorizontal: 70,
  },
  item: {
    backgroundColor: "#444952",
    padding: 20,
    marginVertical: 8,
  },
  header: {
    fontSize: 32,
    textAlign: "center",
  },
  title: {
    fontSize: 24,
    textAlign: "center",
    color: "white",
  },
});
