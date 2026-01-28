import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { Star, Mic2 } from 'lucide-react-native';
import React, { useState } from 'react';
import { Pressable, StyleSheet, Text, View, TextInput, Alert, Dimensions, Animated } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import Colors from '@/constants/colors';

const { width, height } = Dimensions.get('window');

// Import the local asset (assuming it's in assets/rbd-bg.png) 
// In Expo, we often require assets, but for now we'll use a blurred overlay approach
// or a simple placeholder if the file logic is tricky without require().
// We'll trust the asset is at ./assets/rbd-bg.png relative to root, but requiring dynamic paths is hard.
// We will use a require with a known path if possible, or an external URL fallback for safety if the copy didn't work.
// Since we copied it, let's try to reference it, but `require` needs string literal.

export default function LoginScreen() {
    const router = useRouter();
    const [name, setName] = useState('');

    const handleLogin = () => {
        router.replace('/home');
    };

    return (
        <View style={styles.container}>

            {/* Background Image - Using a require or URI */}
            <Image
                source={require('../assets/rbd-bg.png')}
                style={StyleSheet.absoluteFill}
                contentFit="cover"
            />

            <LinearGradient
                colors={['rgba(233, 30, 99, 0.4)', 'rgba(0,0,0,0.9)']}
                style={StyleSheet.absoluteFill}
            />

            <SafeAreaView style={styles.content}>
                <View style={styles.logoContainer}>
                    <View style={styles.logoCircle}>
                        <Star size={40} color={Colors.primary} fill={Colors.primary} />
                    </View>
                    <Text style={styles.logoText}>RBD</Text>
                    <Text style={styles.logoSubtext}>World Tour</Text>
                </View>

                <View style={styles.formContainer}>
                    <Text style={styles.welcomeText}>¡Hola, Carmen Elena!</Text>
                    <Text style={styles.instructionText}>Bienvenida a tu espacio Rebelde</Text>


                    <Pressable
                        style={({ pressed }) => [
                            styles.loginButton,
                            pressed && styles.loginButtonPressed,
                        ]}
                        onPress={handleLogin}
                    >
                        <Mic2 size={24} color="#FFF" style={styles.icon} />
                        <Text style={styles.loginButtonText}>SOY REBELDE</Text>
                    </Pressable>

                    <Text style={styles.footerTagline}>"Y soy rebelde... cuando no sigo a los demás"</Text>
                </View>
            </SafeAreaView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
    },
    content: {
        flex: 1,
        justifyContent: 'space-between',
        padding: 30,
    },
    logoContainer: {
        marginTop: 60,
        alignItems: 'center',
    },
    logoCircle: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: 'rgba(255,255,255,0.1)',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 2,
        borderColor: Colors.primary,
        marginBottom: 16,
    },
    logoText: {
        fontSize: 60,
        fontWeight: '900',
        color: '#FFF',
        letterSpacing: 4,
    },
    logoSubtext: {
        fontSize: 14,
        color: Colors.secondary,
        letterSpacing: 6,
        fontWeight: '600',
        marginTop: -5,
    },
    formContainer: {
        marginBottom: 50,
        width: '100%',
        alignItems: 'center',
    },
    welcomeText: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#FFF',
        marginBottom: 8,
        textAlign: 'center',
    },
    instructionText: {
        fontSize: 16,
        color: 'rgba(255,255,255,0.7)',
        marginBottom: 40,
        textAlign: 'center',
    },
    input: {
        backgroundColor: 'rgba(255,255,255,0.1)',
        width: '100%',
        padding: 16,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.2)',
        color: '#FFF',
        fontSize: 16,
        marginBottom: 20,
    },
    loginButton: {
        backgroundColor: Colors.primary,
        paddingVertical: 18,
        paddingHorizontal: 40,
        borderRadius: 30,
        width: '100%',
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
        shadowColor: Colors.primary,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.5,
        shadowRadius: 10,
        elevation: 5,
    },
    loginButtonPressed: {
        transform: [{ scale: 0.98 }],
        opacity: 0.9,
    },
    loginButtonText: {
        color: '#FFF',
        fontSize: 18,
        fontWeight: 'bold',
        letterSpacing: 2,
        marginLeft: 8,
    },
    icon: {
        marginRight: 8,
    },
    footerTagline: {
        color: 'rgba(255,255,255,0.5)',
        fontSize: 14,
        fontStyle: 'italic',
        marginTop: 30,
        textAlign: 'center',
    },
});
