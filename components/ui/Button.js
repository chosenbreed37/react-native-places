import { StyleSheet, Text, Pressable } from 'react-native';
import { Colors } from '../../constants/colors';

function Button({ onPress, children }) {
    return (<Pressable style={({ pressed }) => [styles.button, pressed && styles.pressed]} onPress={onPress}>
        <Text style={styles.text}>{children}</Text>
    </Pressable>)
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: Colors.primary800,
        paddingHorizontal: 12,
        paddingVertical: 8,
        margin: 4,
        elevation: 2,
        shadowColor: 'black',
        shadowOpacity: 0.15,
        shadowRadius: 2,
        shadowOffset: { width: 1, height: 1 },
        borderRadius: 4
    },
    text: {
        fontSize: 16,
        textAlign: 'center',
        color: Colors.primary50
    },
    pressed: {
        opacity: 0.7,
    }
});

export default Button;