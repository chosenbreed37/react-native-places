import PlacesList from '../components/places/PlacesList';
import { useState, useEffect } from 'react';
import { useIsFocused } from '@react-navigation/native';
import { fetchPlaces } from '../utils/database';

function AllPlaces({route}){
    const [places, setPlaces] = useState([]);

    const isFocused = useIsFocused();

    useEffect(() => {
    }, []);

    useEffect(() => {
        async function loadPlaces() {
            const loadedPlaces = await fetchPlaces();
            setPlaces(loadedPlaces);
        }

        if (isFocused) {
            loadPlaces();
        }
        // async function loadPlaces() {
        //     const response = await fetch('https://favourite-places-1b3e5-default-rtdb.firebaseio.com/places.json');
        //     const responseData = await response.json();
        //     const loadedPlaces = [];
        //     for (const key in responseData) {
        //         loadedPlaces.push({
        //             id: key,
        //             title: responseData[key].title,
        //             imageUri: responseData[key].imageUri,
        //             address: responseData[key].address,
        //             location: responseData[key].location
        //         });
        //     }
        //     setPlaces(loadedPlaces);
        // }
        // loadPlaces();
    }, [isFocused]);

    return (
        <PlacesList places={places} />
    );
}

export default AllPlaces;