import { Ionicons } from '@expo/vector-icons';
import { Text, Pressable, StyleSheet } from 'react-native';
import { Colors } from '../../constants/colors';

function OutlinedButton({ onPress, icon, children }) {
    return <Pressable onPress={onPress} style={({ pressed }) => [styles.button, pressed && styles.pressed]}>
        <Ionicons style={styles.icon} name={icon} size={18} color={Colors.primary500} />
        <Text style={styles.text}>{children}</Text>
    </Pressable>
}

const styles = StyleSheet.create({
    container: {

        borderRadius: 24,
    },
    text: {
        color: Colors.primary500,
    },
    pressed: {
        opacity:0.7
    },
    button: {
        paddingHorizontal: 12,
        paddingVertical: 6,
        margin: 4,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: Colors.primary500,
    },
    icon: {
        margin:6
    }
});

export default OutlinedButton;