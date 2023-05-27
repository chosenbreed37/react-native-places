import { View, Text, ScrollView, StyleSheet, Image } from 'react-native';
import OutlinedButton from '../components/ui/OutlinedButton';
import { Colors } from '../constants/colors';
import { useEffect, useState } from 'react';
import { fetchPlace } from '../utils/database';

function PlaceDetails({ route, navigation }) {
    const [place, setPlace] = useState(null);

    const placeId = route.params?.placeId;

    useEffect(() => {
        async function getPlace() {
            const place = await fetchPlace(placeId);
            navigation.setOptions({ title: place && place.title });
            setPlace(place);
        }
        getPlace();
    }, [navigation, placeId, fetchPlace]);

    function showOnMapHandler() {
        navigation.navigate('Map', { readOnly: true, location: place.location });
    }

    if (!place) {
        return <View style={styles.fallback}><Text>Loading place...</Text></View>;
    }

    return (<ScrollView>
        <Image source={{ uri: place.imageUri }} style={styles.image} />
        <View style={styles.locationContainer}>
            <View style={styles.addressContainer}>
                <Text style={styles.address}>{place.address}</Text>
            </View>
            <OutlinedButton icon='map' onPress={showOnMapHandler}>View on map</OutlinedButton>
        </View>
    </ScrollView>);
}

const styles = StyleSheet.create({
    fallback: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        height: '35%',
        minHeight: 300,
        width: '100%'
    },
    locationContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    addressContainer: {
        padding: 20,
    },
    address: {
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 16,
        color: Colors.primary500
    }
});

export default PlaceDetails;