import { useState, useEffect } from 'react';
import { View, StyleSheet, Alert, Text, Image } from 'react-native';
import OutlinedButton from '../ui/OutlinedButton';
import { Colors } from '../../constants/colors';
import { getCurrentPositionAsync, useForegroundPermissions, PermissionStatus } from 'expo-location';
import { getMapPreview } from '../../utils/location';
import { useNavigation, useIsFocused, useRoute } from '@react-navigation/native';
import { getAddress } from '../../utils/location';

function LocationPicker({ onLocationPicked }) {
    const [locationPermission, requestPermission] = useForegroundPermissions();
    const [pickedLocation, setPickedLocation] = useState(null);
    const navigation = useNavigation();

    const route = useRoute();
    const isFocused = useIsFocused();

    useEffect(() => {
        async function locateUser() {
            if (pickedLocation) {
                const address = await getAddress(pickedLocation.lat, pickedLocation.lng);
                onLocationPicked({...pickedLocation, address});
            }
        }
        locateUser();
    }, [pickedLocation, onLocationPicked]);

    useEffect(() => {
        if (route.params?.pickedLocation) {
            setPickedLocation(route.params.pickedLocation);
        }
    }, [route.params?.pickedLocation, isFocused]);

    async function verifyPermissions() {
        if (locationPermission.status !== PermissionStatus.GRANTED) {
            const result = await requestPermission();
            if (result.status !== PermissionStatus.GRANTED) {
                Alert.alert('Insufficient permissions!', 'You need to grant location permissions to use this app.',
                    [{ text: 'Okay' }]);
                return false;
            }
            return true;
        }
        return true;
    }

    async function locateUser() {
        const hasPermission = await verifyPermissions();
        if (!hasPermission) {
            return;
        }
        const location = await getCurrentPositionAsync();
        setPickedLocation({ lat: location.coords.latitude, lng: location.coords.longitude });
    }

    function pickOnMap() {
        navigation.navigate('Map');
    }

    let locationPreview = <Text>No location selected</Text>;

    if (pickedLocation) {
        locationPreview = <Image style={styles.image} source={{ uri: getMapPreview(pickedLocation.lat, pickedLocation.lng) }} />;
    }

    return (<View>
        <View style={styles.locationPreview}>
            {locationPreview}
        </View>
        <View style={styles.buttonContainer}>
            <OutlinedButton icon='location' onPress={locateUser}>Locate user</OutlinedButton>
            <OutlinedButton icon='map' onPress={pickOnMap}>Pick on map</OutlinedButton>
        </View>
    </View>);
}

const styles = StyleSheet.create({
    image: {
        width: '100%',
        height: '100%'
    },
    locationPreview: {
        width: '100%',
        height: 200,
        marginVertical: 8,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.primary100,
        borderRadius: 4,
        overflow: 'hidden'
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
    }
});
export default LocationPicker;