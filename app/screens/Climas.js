import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  StatusBar,
} from "react-native";
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
    key: "caa5a41856bc9c627d6ba263aba38a03",
    nombre: cityName,
  };

  //pregunta a la URL cuales son los datos de dicho pais, los guarda en clima y hace funcionar el LOAD
  function ObtenerClima() {
    setLoad(true);

    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${api.nombre}&appid=${api.key}&units=metric`
    )
      .then((res) => {
        if (res.status !== 200) {
          setError(true);
          console.log("entro al error 200");
        }
        return res.json();
      })
      .then((res) => {
        if (res.status !== 400) {
          setError(true);
          console.log("entro al error 400");
        }
        return res.json();
      })
      .catch((error) => console.error(error))
      .then((json) => {
        if (json) {
          setClima(json);
          guardarClima(json);
        } else {
          console.log("error en el json");
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
    setLoad(true);
    try {
      let listaClimas = [];
      const itemClima = await AsyncStorage.getItem("listaClimas");
      //consulta la lista si tiene o no la ciudad para no repetir
      if (itemClima) {
        listaClimas = JSON.parse(itemClima);

        if (
          //busca el pais/ciudad en la lista
          listaClimas.find(
            (item) =>
              item.ciudad.trim().toUpperCase() === e.name.trim().toUpperCase()
          )
        ) {
          //Si encuentra la cdd en la lista, manda un alert con la ciudad
          alert("Esta ciudad ya existe, es: " + e.name + e.main.temp + " °C");
        } else {
          //si no la encontró, agrega la ciudad a la lista
          listaClimas.push({
            ciudad: e.name.trim().toUpperCase(),
            temperatura: e.main.temp,
            Descripcion: e.weather[0].description,
            Humedad: e.main.humidity,
            Icon_primero: e.weather[0].icon,
            Icon_segundo: e.weather[0].main,
          });
          const jsonValue = JSON.stringify(listaClimas);
          await AsyncStorage.setItem("listaClimas", jsonValue);
          alert("La ciudad fue agregada!");
          window.location.reload(true);
          mostrarData(listaClimas);
        }
      } else {
        //pienso que nunca va a entrar acá
        console.log("entro al 3");
        listaClimas.push({
          ciudad: e.name.trim().toUpperCase(),
          temperatura: e.main.temp,
          Descripcion: e.weather[0].description,
          Humedad: e.main.humidity,
          Icon_primero: e.weather[0].icon,
          Icon_segundo: e.weather[0].main,
        });
        const jsonValue = JSON.stringify(listaClimas);
        await AsyncStorage.setItem("listaClimas", jsonValue);
      }
      setLoad(false);
    } catch (error) {
      return setError(error);
    }
  };

  /*
  function mostrarData(inf) {
    console.log(inf);
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView style={styles.scrollView}>
          {inf.map((item) => (
            <View style={styles.fondo}>
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
                onPress={() => BorrarClima(inf, item.ciudad)}
              />
              <Divider />
            </View>
          ))}
        </ScrollView>
      </SafeAreaView>
    );
  }
*/
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
      <Loading isVisible={load} text="Cargando.." />
      {
        //clima ? mostrarData(clima) : console.log("no entra nucna")
      }
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
  inputForm: {
    width: "80%",
    marginTop: 20,
    margin: "auto",
  },
  btnClima: {
    backgroundColor: "#03e3fc",
    marginTop: 20,
    width: "30%",
  },
  ciudad: {
    fontSize: 30,
  },
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
  },
  scrollView: {
    marginHorizontal: 20,
  },
});
