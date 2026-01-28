import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { ArrowLeft, Music, Calendar, MapPin, Play } from 'lucide-react-native';
import React from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as WebBrowser from 'expo-web-browser';

import Colors from '@/constants/colors';
import { tourSetlist } from '@/mocks/rbd-data';

const { width } = Dimensions.get('window');

export default function TourScreen() {
    const router = useRouter();

    return (
        <View style={styles.container}>
            <Image
                source={require('../assets/tour_bg.jpg')}
                style={styles.backgroundImage}
                contentFit="cover"
            />
            <LinearGradient
                colors={['rgba(0,0,0,0.3)', Colors.background]}
                style={styles.gradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 0, y: 0.8 }}
            />

            <SafeAreaView style={styles.safeArea}>
                <View style={styles.header}>
                    <Pressable onPress={() => router.back()} style={styles.backButton}>
                        <ArrowLeft size={24} color="#FFF" />
                    </Pressable>
                </View>

                <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
                    <View style={styles.titleContainer}>
                        <Text style={styles.tagline}>EL REENCUENTRO</Text>
                        <Text style={styles.title}>Soy Rebelde</Text>
                        <Text style={styles.titlehighlight}>Tour 2023</Text>
                    </View>

                    <View style={styles.statsRow}>
                        <View style={styles.statItem}>
                            <MapPin size={24} color={Colors.primary} />
                            <Text style={styles.statValue}>4</Text>
                            <Text style={styles.statLabel}>Países</Text>
                        </View>
                        <View style={styles.statItem}>
                            <Calendar size={24} color={Colors.primary} />
                            <Text style={styles.statValue}>50+</Text>
                            <Text style={styles.statLabel}>Shows</Text>
                        </View>
                        <View style={styles.statItem}>
                            <Music size={24} color={Colors.primary} />
                            <Text style={styles.statValue}>2.5M+</Text>
                            <Text style={styles.statLabel}>Fans</Text>
                        </View>
                    </View>

                    <Pressable
                        style={styles.playButton}
                        onPress={() => WebBrowser.openBrowserAsync('https://www.youtube.com/results?search_query=soy+rebelde+tour+2023+full+concert')}
                    >
                        <Play size={24} color="#FFF" fill="#FFF" />
                        <Text style={styles.playButtonText}>Ver Concierto</Text>
                    </Pressable>

                    <View style={styles.setlistContainer}>
                        <Text style={styles.sectionTitle}>Setlist Oficial</Text>

                        {tourSetlist.map((song, index) => (
                            <View key={index} style={styles.songRow}>
                                <Text style={styles.songIndex}>{index + 1}</Text>
                                <View style={styles.songInfo}>
                                    <Text style={styles.songTitle}>{song.title}</Text>
                                    <Text style={styles.songAlbum}>{song.album}</Text>
                                </View>
                            </View>
                        ))}
                    </View>

                    <View style={{ height: 40 }} />
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
    backgroundImage: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: width,
        height: width * 1.5,
        opacity: 0.6,
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
    header: {
        paddingHorizontal: 20,
        paddingTop: 10,
    },
    backButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: 'rgba(0,0,0,0.5)',
        alignItems: 'center',
        justifyContent: 'center',
    },
    content: {
        paddingTop: 20,
        paddingHorizontal: 20,
    },
    titleContainer: {
        marginTop: 20,
        marginBottom: 30,
    },
    tagline: {
        color: Colors.primary,
        fontSize: 14,
        fontWeight: '800',
        letterSpacing: 2,
        marginBottom: 8,
    },
    title: {
        fontSize: 42,
        fontWeight: '900',
        color: '#FFF',
        lineHeight: 42,
    },
    titlehighlight: {
        fontSize: 42,
        fontWeight: '900',
        color: Colors.primary,
        lineHeight: 42,
    },
    statsRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: Colors.card,
        borderRadius: 20,
        padding: 24,
        marginBottom: 30,
        borderWidth: 1,
        borderColor: Colors.border,
    },
    statItem: {
        alignItems: 'center',
    },
    statValue: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#FFF',
        marginTop: 8,
    },
    statLabel: {
        fontSize: 12,
        color: Colors.textSecondary,
        marginTop: 4,
    },
    playButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.primary,
        borderRadius: 30,
        paddingVertical: 16,
        marginBottom: 40,
        gap: 12,
        elevation: 10,
        shadowColor: Colors.primary,
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.5,
        shadowRadius: 20,
    },
    playButtonText: {
        color: '#FFF',
        fontSize: 18,
        fontWeight: 'bold',
    },
    setlistContainer: {
        backgroundColor: 'rgba(0,0,0,0.3)',
        borderRadius: 24,
        padding: 24,
    },
    sectionTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#FFF',
        marginBottom: 20,
    },
    songRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(255,255,255,0.1)',
        paddingBottom: 16,
    },
    songIndex: {
        fontSize: 18,
        fontWeight: 'bold',
        color: Colors.gray,
        width: 30,
    },
    songInfo: {
        flex: 1,
    },
    songTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#FFF',
        marginBottom: 2,
    },
    songAlbum: {
        fontSize: 12,
        color: Colors.textSecondary,
    },
});
