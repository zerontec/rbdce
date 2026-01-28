import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { ArrowLeft, Star } from 'lucide-react-native';
import React from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import Colors from '@/constants/colors';
import { members } from '@/mocks/rbd-data';

export default function MemberDetailScreen() {
    const router = useRouter();
    const { name } = useLocalSearchParams();

    // Find member by name
    const member = members.find(m => m.name === name);

    if (!member) {
        return (
            <View style={styles.container}>
                <SafeAreaView>
                    <Text style={{ color: 'white' }}>Member not found</Text>
                    <Pressable onPress={() => router.back()}>
                        <Text style={{ color: Colors.primary }}>Go back</Text>
                    </Pressable>
                </SafeAreaView>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Image
                source={member.photo}
                style={styles.heroImage}
                contentFit="cover"
            />
            <LinearGradient
                colors={['transparent', Colors.background]}
                style={styles.gradient}
            />

            <SafeAreaView style={styles.safeArea}>
                <Pressable onPress={() => router.back()} style={styles.backButton}>
                    <ArrowLeft size={24} color="#FFF" />
                </Pressable>

                <ScrollView contentContainerStyle={styles.content}>
                    <View style={styles.headerSpacer} />
                    <View style={styles.infoContainer}>
                        <View style={styles.nameContainer}>
                            <Text style={styles.name}>{member.name}</Text>
                            <Star size={24} color={Colors.primary} fill={Colors.primary} />
                        </View>
                        <Text style={styles.character}>aka {member.character}</Text>

                        <View style={styles.bioContainer}>
                            <Text style={styles.bioTitle}>Biografía</Text>
                            <Text style={styles.bioText}>{member.bio}</Text>
                        </View>
                    </View>
                </ScrollView>
            </SafeAreaView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.background,
    },
    heroImage: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: '60%',
        width: '100%',
    },
    gradient: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    },
    safeArea: {
        flex: 1,
    },
    backButton: {
        position: 'absolute',
        top: 50,
        left: 20,
        zIndex: 10,
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: 'rgba(0,0,0,0.5)',
        alignItems: 'center',
        justifyContent: 'center',
    },
    content: {
        paddingBottom: 40,
    },
    headerSpacer: {
        height: 350,
    },
    infoContainer: {
        padding: 24,
    },
    nameContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
        marginBottom: 8,
    },
    name: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#FFF',
    },
    character: {
        fontSize: 18,
        color: Colors.primary,
        fontWeight: '600',
        marginBottom: 30,
    },
    bioContainer: {
        backgroundColor: Colors.card,
        padding: 24,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: Colors.border,
    },
    bioTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#FFF',
        marginBottom: 16,
    },
    bioText: {
        fontSize: 16,
        color: Colors.textSecondary,
        lineHeight: 24,
    },
});
