import MapView, { Marker } from 'react-native-maps';
import { StyleSheet, Alert } from 'react-native';
import { useState, useLayoutEffect, useCallback, useEffect } from 'react';
import IconButton from '../components/ui/IconButton';

const saveSelectedLocationHandler = (navigation, selectedLocation) => {
    console.log('>>> saveSelectedLocationHandler: ', selectedLocation);
    if (!selectedLocation) {
        Alert.alert('No location selected!', 'Please select a location on the map.', [{ text: 'Okay' }]);
        return;
    }
    navigation.navigate('AddPlace', { pickedLocation: { lat: selectedLocation.latitude, lng: selectedLocation.longitude } });
}


function Map({ navigation, route }) {
    const initialLocation = route.params?.location;
    const defaultLocation = initialLocation && {
        latitude: initialLocation && initialLocation.lat,
        longitude: initialLocation && initialLocation.lng
    };

    const [selectedLocation, setSelectedLocation] = useState(defaultLocation);

    const region = {
        latitude: initialLocation && initialLocation.lat || 37.78,
        longitude: initialLocation && initialLocation.lng || -122.43,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421
    };


    useLayoutEffect(() => {
        if (initialLocation) {
            return;
        }
        navigation.setOptions({
            headerRight: ({ tintColor }) => <IconButton icon="save" size={24} color={tintColor} onPress={() => saveSelectedLocationHandler(navigation, selectedLocation)} />
        });
    }, [navigation, selectedLocation]);

    function selectLocationHandler(event) {
        if (initialLocation) {
            return;
        }
        
        const latitude = event.nativeEvent.coordinate.latitude;
        const longitude = event.nativeEvent.coordinate.longitude;

        //setSelectedLocation(prev => ({...prev, latitude, longitude }));
        setSelectedLocation({ latitude, longitude });
    }

    return <MapView region={region} style={styles.map} onPress={selectLocationHandler}>
        {selectedLocation && <Marker coordinate={selectedLocation}></Marker>}
    </MapView>;
}

const styles = StyleSheet.create({
    map: {
        flex: 1
    }
});

export default Map;