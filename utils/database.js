import * as sqlite from 'expo-sqlite';

const database = sqlite.openDatabase('places.db');

export function init() {
    const promise = new Promise((resolve, reject) => {
        database.transaction(tx => {
            tx.executeSql(`CREATE TABLE IF NOT EXISTS 
            places (id INTEGER PRIMARY KEY NOT NULL, 
                title TEXT NOT NULL, 
                imageUri TEXT NOT NULL, 
                address TEXT NOT NULL, 
                lat REAL NOT NULL, 
                lng REAL NOT NULL);`,
                [], () => resolve(),
                (_, err) => reject(err));
        });
    });

    return promise;
}

const dbToModel = (place) => {
    return {
        ...place,
        location: {
            lat: place.lat,
            lng: place.lng
        }
    };
}

export function fetchPlace(id) {
    console.log('>>> fetchPlace...');
    return new Promise((resolve, reject) => {
        database.transaction(tx => {
            tx.executeSql(`SELECT * FROM places WHERE id = ?`,
                [id],
                (_, result) => {
                    console.log('>>> fetch result: ', result);
                    const { rows: { _array} } = result;
                    const place = dbToModel(_array[0]);

                    console.log('>>> place: ', place);

                    resolve(place);
                },
                (_, err) => reject(err));
        });
    });
}

export function fetchPlaces() {
    console.log('>>> fetchPlaces...')
    const promise = new Promise((resolve, reject) => {
        database.transaction(tx => {
            tx.executeSql(`SELECT * FROM places`,
                [], (_, result) => {
                    console.log('>>> fetch result: ', result);
                    const { rows: { _array} } = result;
                    const places = _array.map(place => dbToModel(place));

                    console.log('>>> places: ', places);

                    resolve(places);
                },
                (_, err) => reject(err));
        });
    });

    return promise;
}

export function insertPlace({title, imageUri, address, location: {lat, lng}}) {
    const promise = new Promise((resolve, reject) => {
        database.transaction(tx => {
            tx.executeSql(`INSERT INTO places (title, imageUri, address, lat, lng) 
            VALUES (?, ?, ?, ?, ?);`,
                [title, imageUri, address, lat, lng],
                (_, result) => {
                    console.log('>>> insert result: ', result);
                    resolve(result);
                },
                (_, err) => reject(err));
        });
    });

    return promise;
}
