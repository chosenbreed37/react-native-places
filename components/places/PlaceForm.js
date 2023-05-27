import { useCallback, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput } from 'react-native';
import { Colors } from '../../constants/colors';
import ImagePicker from './ImagePicker';
import LocationPicker from './LocationPicker';
import Button from '../ui/Button';
import { Place } from '../../models/places';

function PlaceForm({onSavePlace}) {
    const [title, setTitle] = useState('');
    const [imageUri, setImageUri] = useState();
    const [location, setLocation] = useState();

    function onChangeTitle(text) {
        setTitle(text);
    }

    function onImagePicked(imageUri) {
        setImageUri(imageUri);
    }

    const onLocationPicked = useCallback((location) => {
        console.log('>>> location: ', location);
        setLocation(location);
    }, []);

    function savePlaceHandler(){
        const place = new Place(title, imageUri, location);
        onSavePlace(place);
    }

    return (
        <ScrollView style={styles.form}>
            <View>
                <Text style={styles.title}>Title</Text>
                <TextInput style={styles.input} onChangeText={onChangeTitle} value={title} />
            </View>
            <ImagePicker onImagePicked={onImagePicked} />
            <LocationPicker onLocationPicked={onLocationPicked} />
            <Button onPress={savePlaceHandler}>Add Place</Button>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    form: {
        flex: 1,
        margin: 16
    },
    title: {
        fontWeight: 'bold',
        marginBottom: 4,
        color: Colors.primary500
    },
    input: {
        marginVertical: 8,
        paddingVertical: 8,
        paddingHorizontal: 4,
        backgroundColor: Colors.primary100,
        borderBottomColor: Colors.primary700,
        borderBottomWidth: 2,
        fontSize: 16
    }
});

export default PlaceForm;