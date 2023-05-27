export class Place {
    constructor(title, imageUri, location, id) {
        const { lat, lng, address } = location;
        this.title = title;
        this.imageUri = imageUri;
        this.address = address;
        this.location = { lat, lng };
        this.id = id;
    }
}