const API_KEY = '';


export function getMapPreview(lat, lng) {
    const imagePreviewUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${lat},${lng}&zoom=14&size=400x200&maptype=roadmap&markers=color:red%7Clabel:C%7C${lat},${lng}&key=${API_KEY}`;

    return imagePreviewUrl;
}

export async function getAddress(lat, lng) {
    console.log(`>>> getAddress: ${lat}, ${lng}`);
    const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${API_KEY}`;
    const response = await fetch(url);

    if (!response.ok) {
        throw new Error('Failed to fetch address!');
    }

    const {results: [result]} = await response.json();

    return result.formatted_address;
}