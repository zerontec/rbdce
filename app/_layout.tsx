import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export default function RootLayout() {
    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <Stack screenOptions={{ headerShown: false }}>
                <Stack.Screen name="index" />
                <Stack.Screen name="history" />
                <Stack.Screen name="discography" />
                <Stack.Screen name="album" />
            </Stack>
            <StatusBar style="light" />
        </GestureHandlerRootView>
    );
}
