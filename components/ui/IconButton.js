import { View, Pressable, StyleSheet} from 'react-native';
import {Ionicons} from '@expo/vector-icons';

function IconButton({icon, size, color, onPress}){
    return (<Pressable onPress={onPress} style={({pressed}) => pressed ? styles.pressed: null}>
        <View style={styles.container}>
            <Ionicons name={icon} size={size} color={color} />
        </View>
    </Pressable>)
}

const styles = StyleSheet.create({
    container: {
        borderRadius: 24,
        padding: 6,
        margin: 4,
        justifyContent: 'center',
        alignItems: 'center'
    },
    pressed: {
        opacity: 0.7
    }
});

export default IconButton;