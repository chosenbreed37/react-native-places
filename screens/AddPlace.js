import PlaceForm from '../components/places/PlaceForm';
import { insertPlace } from '../utils/database';

function AddPlace({navigation}) {
    async function savePlaceHandler(place) {
        console.log('>>> savePlaceHandler: ', place);
        await insertPlace(place);
        navigation.navigate('AllPlaces');
    }

    return (
        <PlaceForm onSavePlace={savePlaceHandler}/>
    );
}

export default AddPlace;