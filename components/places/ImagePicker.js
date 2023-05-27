import { useState } from 'react';
import { View, Button, Alert, Image, StyleSheet } from 'react-native';
import { launchCameraAsync, useCameraPermissions, PermissionStatus, MediaTypeOptions, launchImageLibraryAsync } from 'expo-image-picker';
import { Colors } from '../../constants/colors';
import OutlinedButton from '../ui/OutlinedButton';

function ImagePicker({onImagePicked}) {
    const [pickedImage, setPickedImage] = useState();
    const [cameraPermission, requestPermission] = useCameraPermissions();

    async function verifyPermissions() {
        console.log('>>> cameraPermission: ', cameraPermission);
        if (cameraPermission.status !== PermissionStatus.GRANTED) {
            const result = await requestPermission();
            if (result.status !== PermissionStatus.GRANTED) {
                Alert.alert('Insufficient permissions!', 'You need to grant camera permissions to use this app.',
                    [{ text: 'Okay' }]);
                return false;
            }
            return true;
        }
        // if (cameraPermission.status === PermissionStatus.DENIED) {
        //     Alert.alert('Insufficient permissions!', 'You need to grant camera permissions to use this app.',
        //         [{ text: 'Okay' }]);
        //     return false;
        // }
        return true;
    }

    async function pickImage() {
        const result = await launchImageLibraryAsync({
            mediaTypes: MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [16, 9],
            quality: 0.5
        });
        console.log('>>> result: ', result);
    }

    async function takeImage() {
        const hasPermission = await verifyPermissions();

        if (!hasPermission) {
            return;
        }

        try {
            const { assets } = await launchCameraAsync({
                mediaTypes: MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [16, 9],
                quality: 0.5
            });

            const [image] = assets
            console.log('>>> image: ', image);
            setPickedImage(image.uri);
            onImagePicked(image.uri);
        } catch (error) {
            console.log('>>> error launching camera: ', error);
        }
    }

    return (<View>
        <View style={styles.imagePreview}>
            <Image style={styles.image} source={{ uri: pickedImage }} />
        </View>
        <OutlinedButton icon='camera' onPress={takeImage}>Take Image</OutlinedButton>
    </View>)
}

const styles = StyleSheet.create({
    image: {
        width: '100%',
        height: '100%'
    },
    imagePreview: {
        width: '100%',
        height: 200,
        marginVertical: 8,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.primary100,
        borderRadius: 4
    }
});

export default ImagePicker;