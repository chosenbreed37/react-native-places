import { FlatList, StyleSheet, Text, View } from 'react-native';
import PlaceItem from './PlaceItem';
import { Colors } from '../../constants/colors';
import { useNavigation } from '@react-navigation/native';

const displayPlace = (place, navigation) => {
    navigation.navigate('PlaceDetails', { placeId: place.id });
}

const renderItem = (item, navigation ) => <PlaceItem place={item} onSelect={() => displayPlace(item, navigation)} />;

function PlacesList({ places }) {
    const navigation = useNavigation();

    if (!places || places.length === 0) {
        return (
            <View style={styles.fallbackContainer}>
                <Text style={styles.fallbackText}>No places defined - start adding some!</Text>
            </View>
        );
    }

    return (<View>
        <FlatList data={places}
            keyExtractor={item => item.id}
            renderItem={({item}) => renderItem(item, navigation)}
            style={styles.list} />
    </View>)
}

const styles = StyleSheet.create({
    list: {
        margin:24
    },
    fallbackContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',

    },
    fallbackText: {
        fontSize: 16,
        color: Colors.primary200
    }
});

export default PlacesList;