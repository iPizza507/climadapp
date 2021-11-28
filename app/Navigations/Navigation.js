import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Icon } from "react-native-elements";

import Favorites from "../screens/Favorites";
import Welcome from "../screens/Welcome";
import Climas from "../screens/Climas";
import We from "../screens/We";

const Tab = createBottomTabNavigator();

export default function Navigation() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="Welcome"
        tabBarOption={{
          activeTintColor: "blue",
        }}
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color }) => screenOption(route, color),
        })}
      >
        <Tab.Screen
          name="Welcome"
          component={Welcome}
          options={{ title: "Welcome" }}
        />

        <Tab.Screen
          name="favorites"
          component={Favorites}
          options={{ title: "Favorites" }}
        />
        <Tab.Screen
          name="Clima"
          component={Climas}
          options={{ title: "Clima" }}
        />
        <Tab.Screen name="We" component={We} options={{ title: "Nosotros" }} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

function screenOption(route, color) {
  let iconName;
  switch (route.name) {
    case "Welcome":
      iconName = "home";
      break;
    case "favorites":
      iconName = "star-border";
      break;
    case "Clima":
      iconName = "filter-drama";
      break;
    case "We":
      iconName = "people";
      break;
  }
  return <Icon type="material" name={iconName} size={22} color={color} />;
}
