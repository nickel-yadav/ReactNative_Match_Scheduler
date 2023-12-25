import * as React from "react";
import HomeScreen from "./src/screens/HomeScreen";
import SlotSelectionScreen from "./src/screens/SlotSelectionScreen";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { store, persistor } from "./src/store";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

const Tab = createBottomTabNavigator();

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NavigationContainer>
          <Tab.Navigator>
            <Tab.Screen
              name="Home"
              component={HomeScreen}
              options={{
                headerShown: false,
                tabBarIcon: () => (
                  <Ionicons name="ios-home-outline" size={24} color="blue" />
                ),
              }}
            />
            <Tab.Screen
              name="SlotSelection"
              component={SlotSelectionScreen}
              options={{
                headerShown: false,
                tabBarIcon: () => (
                  <Entypo name="time-slot" size={24} color="blue" />
                ),
              }}
            />
          </Tab.Navigator>
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
}

export default App;
