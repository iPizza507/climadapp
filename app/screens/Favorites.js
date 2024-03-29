import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  StatusBar,
} from "react-native";
import { Divider, Icon, Button } from "react-native-elements";
import AsyncStorage from "@react-native-async-storage/async-storage";

import Loading from "../components/Loading";

export default function Favorites() {
  const [info, setInfo] = useState(null);
  const [load, setLoad] = useState(false);
  const [myCities, setMyCities] = useState(null);
  useEffect(async () => {
    setLoad(true);
    const lista = await AsyncStorage.getItem("listaClimas");
    setInfo(lista);
    setLoad(false);
    return () => {};
  }, []);

  function mostrarData(inf) {
    const listas = JSON.parse(inf);
    console.log(listas);
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView style={styles.scrollView}>
          {listas.map((item) => (
            <View key={listas.ciudad} style={styles.fondo}>
              <Text style={styles.ciudad}>
                {item.ciudad + " " + item.temperatura + " °C"}
              </Text>
              <Text>{item.Descripcion}</Text>
              <Text>{item.Humedad}</Text>
              {
                //no funciona el icono..
                //<Icon name={item.Icon_primero} type={item.Icon_segundo}></Icon>
              }
              <Icon
                type="material"
                name="delete"
                onPress={() => BorrarClima(listas, item.ciudad)}
              />
              <Divider />
            </View>
          ))}
        </ScrollView>
      </SafeAreaView>
    );
  }

  async function BorrarClima(borraCiudad, nombre) {
    setLoad(true);
    if (
      //compara y busca la ciudad
      borraCiudad.find(
        (item) =>
          item.ciudad.trim().toUpperCase() === nombre.trim().toUpperCase()
      )
    ) {
      //la encuentra y la remueve de la lista
      //borraCiudad.splice(nombre);
      try {
        const cortar = borraCiudad.filter((item) => item.ciudad !== nombre);
        const json_value = JSON.stringify(cortar);
        await AsyncStorage.setItem("listaClimas", json_value);
        setMyCities(cortar);
        window.location.reload(true);
        setLoad(true);
      } catch (error) {
        console.log(error);
      }
    }
  }

  function BorrarTodo() {
    AsyncStorage.clear();
    console.log("borrado pa2");
  }

  return (
    <View style={styles.fondo}>
      <Text style={styles.titulo}>Ciudades Favoritas: </Text>
      <Loading isVisible={load} text="Cargando.." />
      {info ? mostrarData(info) : console.log()}
      <Button
        title="Borrar todos los climas"
        onPress={() => BorrarTodo()}
        buttonStyle={styles.btnClima}
        color="red"
        icon={<Icon type="material" name="delete" size={22} color="white" />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  fondo: {
    backgroundColor: "#c2f4ff",
    height: "100%",
    flex: 1,
    alignItems: "center",
  },
  titulo: {
    fontSize: 40,
  },
  ciudad: {
    fontSize: 20,
  },
  btnClima: {
    backgroundColor: "#03e3fc",
    marginTop: 20,
    width: "30%",
  },
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
  },
  scrollView: {
    marginHorizontal: 20,
  },
});
