import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Input, Button, Icon } from "react-native-elements";

import Loading from "../components/Loading";

export default function Climas() {
  //Declara un estado para posteriormente guardar los datos:
  const [clima, setClima] = useState(null);
  //estado para que aparezca el "cargando"
  const [load, setLoad] = useState(false);
  //estado por si hay un error (200)
  const [error, setError] = useState(false);
  //verifica cuando el usuario ingresa los datos (osea, los paises)
  const [cityName, setcityName] = useState("");

  //obitene el nombre del pais
  const handleInputChange = ({ target }) => {
    setcityName(target.value);
  };

  //es la URL con todos los datos
  const api = {
    name: "arg",
    key: "caa5a41856bc9c627d6ba263aba38a03",
    base: "https://api.openweathermap.org/data/2.5/weather?q=",
  };

  //pregunta a la URL cuales son los datos de dicho pais, los guarda en clima y hace funcionar el LOAD
  function ObtenerClima() {
    setLoad(true);
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${api.name}&appid=${api.key}&units=metric`
    )
      .then((res) => {
        if (res.status !== 200) {
          setError(true);
          console.log("entro al error");
        }
        return res.json();
      })
      .catch((error) => console.error(error))
      .then((json) => {
        if (json) {
          setClima(json);
          guardarClima(json);
          console.log("entro al json");
          console.log(json);
        } else {
          console.log("erro en el json");
        }
        setcityName("");
      })
      .then(() => guardarClima())
      .finally(() => setLoad(false));
  }

  //Guardar en json en asyncStorage

  //Esta funcion guarda los climas y los muestra
  const guardarClima = async (e) => {
    console.log(e);
    //setLoad(true);
    try {
      let listaClimas = [];
      const itemClima = await AsyncStorage.getItem("listaClimas");
      if (itemClima) {
        console.log("item-clima");
        listaClimas = JSON.parse(itemClima);
        if (
          listaClimas.find(
            (item) =>
              item.ciudad.trim().toUpperCase() === e.name.trim().toUpperCase()
          )
        ) {
          return setError("Esta ciudad ya existe, por favor asignar otra");
        } else {
          listaClimas.push({
            ciudad: e.name.trim().toUpperCase(),
            temperatura: e.main.temp,
            Descripcion: e.weather[0].description,
            Humedad: e.main.humidity,
            Icon: e.weather[0].Icon,
          });
          const jsonValue = JSON.stringify(listaClimas);
          await AsyncStorage.setItem("listaClimas", jsonValue);

          alert("Ciudad agregada!");
        }
      } else {
        console.log("no hay item-clima");
        listaClimas.push({
          ciudad: e.name.trim().toUpperCase(),
          temperatura: e.main.temp,
          Descripcion: e.weather[0].description,
          Humedad: e.main.humidity,
          Icon: e.weather[0].Icon,
        });
        const jsonValue = JSON.stringify(listaClimas);
        console.log(jsonValue);
        await AsyncStorage.setItem("listaClimas", jsonValue);
      }
      setLoad(false);
    } catch (error) {
      return setError(error);
    }
  };

  return (
    <View style={styles.fondo}>
      <Input
        placeholder="City Name"
        value={cityName}
        onChange={handleInputChange}
        rightIcon={{
          type: "material",
          name: "location-city",
          size: 22,
        }}
        containerStyle={styles.inputForm}
      />
      <Button
        title="Obtener Clima"
        onPress={() => ObtenerClima()}
        buttonStyle={styles.btnClima}
      />
      {
        //clima ? guardarClima() : console.log("Faltan Datos")
      }

      <Loading isVisible={load} text="Cargando.." />
    </View>
  );
}

const styles = StyleSheet.create({
  fondo: {
    backgroundColor: "#c2f4ff",
    height: "100%",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  inputForm: {
    width: "80%",
    marginTop: 20,
    margin: "auto",
  },
  btnClima: {
    marginTop: 20,
    width: "30%",
  },
  ciudad: {
    fontSize: 30,
  },
});
