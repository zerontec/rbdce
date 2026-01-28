import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { ArrowLeft, Disc3, Disc } from 'lucide-react-native';
import React from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import * as WebBrowser from 'expo-web-browser';
import { SafeAreaView } from 'react-native-safe-area-context';

import Colors from '@/constants/colors';
import { albums } from '@/mocks/rbd-data';

export default function DiscographyScreen() {
    const router = useRouter();

    return (
        <View style={styles.container}>
            <LinearGradient
                colors={[Colors.secondary, Colors.background]}
                style={StyleSheet.absoluteFill}
                start={{ x: 0, y: 0 }}
                end={{ x: 0, y: 0.3 }}
            />

            <SafeAreaView style={styles.safeArea} edges={['top']}>
                <View style={styles.header}>
                    <Pressable
                        style={({ pressed }) => [
                            styles.backButton,
                            pressed && styles.backButtonPressed,
                        ]}
                        onPress={() => router.back()}
                    >
                        <ArrowLeft size={24} color={Colors.text} />
                    </Pressable>
                    <Text style={styles.headerTitle}>Discografía</Text>
                    <View style={styles.backButton} />
                </View>

                <ScrollView
                    style={styles.scrollView}
                    contentContainerStyle={styles.scrollContent}
                    showsVerticalScrollIndicator={false}
                >
                    <View style={styles.intro}>
                        <Disc3 size={40} color={Colors.secondary} strokeWidth={2} />
                        <Text style={styles.introTitle}>Álbumes de RBD</Text>
                        <Text style={styles.introText}>
                            Explora los álbumes de estudio que conquistaron el mundo
                        </Text>
                    </View>

                    {albums.map((album) => (
                        <View key={album.id} style={styles.albumCard}>
                            <Pressable
                                onPress={() => router.push(`/album?id=${album.id}`)}
                                style={({ pressed }) => [styles.cardMainClick, pressed && { opacity: 0.7 }]}
                            >
                                <Image
                                    source={album.cover}
                                    style={styles.albumCover}
                                    contentFit="cover"
                                />
                                <View style={styles.albumInfo}>
                                    <Text style={styles.albumTitle}>{album.title}</Text>
                                    <Text style={styles.albumYear}>{album.year}</Text>
                                    <Text style={styles.albumSongs}>
                                        {album.songs.length} canciones
                                    </Text>
                                </View>
                            </Pressable>

                            import * as WebBrowser from 'expo-web-browser';

                            // ... (inside component)

                            <View style={styles.streamingActions}>
                                {album.spotifyLink && (
                                    <Pressable
                                        style={styles.iconButton}
                                        onPress={() => WebBrowser.openBrowserAsync(album.spotifyLink!)}
                                    >
                                        <Disc3 size={20} color="#1DB954" />
                                    </Pressable>
                                )}
                                {album.youtubeLink && (
                                    <Pressable
                                        style={styles.iconButton}
                                        onPress={() => WebBrowser.openBrowserAsync(album.youtubeLink!)}
                                    >
                                        <Disc size={20} color="#FF0000" />
                                    </Pressable>
                                )}
                            </View>
                        </View>
                    ))}

                    <View style={styles.bottomPadding} />
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
    safeArea: {
        flex: 1,
    },
    header: {
        flexDirection: 'row' as const,
        alignItems: 'center' as const,
        justifyContent: 'space-between' as const,
        paddingHorizontal: 20,
        paddingVertical: 16,
    },
    backButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: Colors.card,
        alignItems: 'center' as const,
        justifyContent: 'center' as const,
    },
    backButtonPressed: {
        opacity: 0.6,
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: '700' as const,
        color: Colors.text,
    },
    scrollView: {
        flex: 1,
    },
    scrollContent: {
        padding: 24,
    },
    intro: {
        alignItems: 'center' as const,
        marginBottom: 32,
    },
    introTitle: {
        fontSize: 28,
        fontWeight: '800' as const,
        color: Colors.text,
        marginTop: 16,
        marginBottom: 8,
    },
    introText: {
        fontSize: 16,
        color: Colors.textSecondary,
        textAlign: 'center' as const,
    },
    albumCard: {
        flexDirection: 'row' as const,
        backgroundColor: Colors.card,
        borderRadius: 20,
        padding: 16,
        marginBottom: 16,
        alignItems: 'center' as const,
        borderWidth: 1,
        borderColor: Colors.border,
    },
    albumCardPressed: {
        opacity: 0.7,
        transform: [{ scale: 0.98 }],
    },
    albumCover: {
        width: 100,
        height: 100,
        borderRadius: 12,
    },
    albumInfo: {
        flex: 1,
        marginLeft: 16,
        gap: 4,
    },
    albumTitle: {
        fontSize: 20,
        fontWeight: '700' as const,
        color: Colors.text,
    },
    albumYear: {
        fontSize: 16,
        color: Colors.secondary,
        fontWeight: '600' as const,
    },
    albumSongs: {
        fontSize: 14,
        color: Colors.textSecondary,
    },
    albumPlayIcon: {
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: Colors.background,
        alignItems: 'center' as const,
        justifyContent: 'center' as const,
    },
    bottomPadding: {
        height: 40,
    },
    cardMainClick: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
    },
    streamingActions: {
        flexDirection: 'column',
        gap: 8,
        marginLeft: 8,
        justifyContent: 'center',
    },
    iconButton: {
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: Colors.background,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: Colors.border,
    },
});
