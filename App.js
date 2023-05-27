import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Alert } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AddPlace from './screens/AddPlace';
import AllPlaces from './screens/AllPlaces';
import Map from './screens/Map';
import IconButton from './components/ui/IconButton';
import { Colors } from './constants/colors';
import { useCallback, useEffect, useState } from 'react';
import { init } from './utils/database';
import * as SplashScreen from 'expo-splash-screen';
import PlaceDetails from './screens/PlaceDetails';

// keep splash screen visible while the app initializes
SplashScreen.preventAutoHideAsync();
console.log('>>> show splash screen');

const Stack = createNativeStackNavigator();

export default function App() {
  const [dbInitialised, setDbInitialised] = useState(false);

  useEffect(() => {
    async function _init() {
      try {
        await init();
        setDbInitialised(true);
      } catch (err) {
        console.log('>>> init error: ', err);
        Alert.alert('Database Error', 'Unable to initialize database. Please try again later.',
          [{ text: 'Okay' }]);
      }
    }
    _init();
  }, [init,]);

  const onLayoutRootView = useCallback(async () => {
    if (dbInitialised) {
      console.log("Hiding splash screen");
      await SplashScreen.hideAsync();
    }
  }, [dbInitialised]);

  if (!dbInitialised) {
    return null;
  }

  return (
    <>
      <StatusBar style="dark" />
      <NavigationContainer onReady={onLayoutRootView}>
        <Stack.Navigator screenOptions={{ headerStyle: { backgroundColor: Colors.primary500 }, headerTintColor: Colors.gray700, contentStyle: { backgroundColor: Colors.gray700 } }}>
          <Stack.Screen name="AllPlaces"
            component={AllPlaces}
            options={({ navigation }) => ({
              title: "Favourite Places",
              headerRight: ({ tintColor }) => <IconButton icon="add" size={32} color={tintColor} onPress={() => { navigation.navigate("AddPlace") }} />
            })} />
          <Stack.Screen name="AddPlace" component={AddPlace} options={{ title: 'Add Place' }} />
          <Stack.Screen name="Map" component={Map} options={{ title: 'Map' }} />
          <Stack.Screen name="PlaceDetails" component={PlaceDetails} options={{ title: 'Detail' }} />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
