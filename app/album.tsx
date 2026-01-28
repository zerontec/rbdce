import { AVPlaybackStatus, Audio } from 'expo-av';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { ArrowLeft, Pause, Play, SkipBack, SkipForward, Music } from 'lucide-react-native';
import React, { useEffect, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import Colors from '@/constants/colors';
import { Album as AlbumType, albums, Song } from '@/mocks/rbd-data';

export default function AlbumScreen() {
    const router = useRouter();
    const { id } = useLocalSearchParams();
    const album = albums.find((a) => a.id === id) as AlbumType;

    const [sound, setSound] = useState<Audio.Sound | null>(null);
    const [currentSong, setCurrentSong] = useState<Song | null>(null);
    const [isPlaying, setIsPlaying] = useState(false);

    useEffect(() => {
        return sound
            ? () => {
                sound.unloadAsync();
            }
            : undefined;
    }, [sound]);

    const playSong = async (song: Song) => {
        if (sound) {
            await sound.unloadAsync();
        }

        const { sound: newSound } = await Audio.Sound.createAsync(
            { uri: song.audioUrl },
            { shouldPlay: true },
            onPlaybackStatusUpdate
        );

        setSound(newSound);
        setCurrentSong(song);
        setIsPlaying(true);
    };

    const onPlaybackStatusUpdate = (status: AVPlaybackStatus) => {
        if (!status.isLoaded) {
            return;
        }

        setIsPlaying(status.isPlaying);

        if (status.didJustFinish) {
            playNext();
        }
    };

    const togglePlayPause = async () => {
        if (!sound) {
            if (album.songs.length > 0) {
                await playSong(album.songs[0]);
            }
            return;
        }

        if (isPlaying) {
            await sound.pauseAsync();
        } else {
            await sound.playAsync();
        }
    };

    const playNext = async () => {
        if (!currentSong) return;
        const currentIndex = album.songs.findIndex((s) => s.id === currentSong.id);
        const nextIndex = (currentIndex + 1) % album.songs.length;
        await playSong(album.songs[nextIndex]);
    };

    const playPrev = async () => {
        if (!currentSong) return;
        const currentIndex = album.songs.findIndex((s) => s.id === currentSong.id);
        const prevIndex = (currentIndex - 1 + album.songs.length) % album.songs.length;
        await playSong(album.songs[prevIndex]);
    };

    if (!album) return null;

    return (
        <View style={styles.container}>
            <LinearGradient
                colors={[Colors.accent, Colors.background]}
                style={StyleSheet.absoluteFill}
                start={{ x: 0, y: 0 }}
                end={{ x: 0, y: 0.4 }}
            />

            <SafeAreaView style={styles.safeArea}>
                <View style={styles.header}>
                    <Pressable style={styles.backButton} onPress={() => router.back()}>
                        <ArrowLeft size={24} color={Colors.text} />
                    </Pressable>
                    <Text style={styles.headerTitle}>Álbum</Text>
                    <View style={{ width: 40 }} />
                </View>

                <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={styles.albumHeader}>
                        <Image source={{ uri: album.cover }} style={styles.coverImage} />
                        <Text style={styles.title}>{album.title}</Text>
                        <Text style={styles.year}>{album.year}</Text>
                    </View>

                    <View style={styles.songList}>
                        {album.songs.map((song) => (
                            <Pressable
                                key={song.id}
                                style={[
                                    styles.songItem,
                                    currentSong?.id === song.id && styles.activeSongItem,
                                ]}
                                onPress={() => playSong(song)}
                            >
                                <View style={styles.songMain}>
                                    <Music
                                        size={20}
                                        color={currentSong?.id === song.id ? Colors.primary : Colors.textSecondary}
                                    />
                                    <Text
                                        style={[
                                            styles.songTitle,
                                            currentSong?.id === song.id && styles.activeSongTitle,
                                        ]}
                                    >
                                        {song.title}
                                    </Text>
                                </View>
                                <Text style={styles.duration}>{song.duration}</Text>
                            </Pressable>
                        ))}
                    </View>
                </ScrollView>

                {currentSong && (
                    <View style={styles.playerBar}>
                        <View style={styles.playerInfo}>
                            <Text style={styles.playerSongTitle} numberOfLines={1}>
                                {currentSong.title}
                            </Text>
                            <Text style={styles.playerAlbumTitle}>{album.title}</Text>
                        </View>
                        <View style={styles.controls}>
                            <Pressable onPress={playPrev}>
                                <SkipBack size={24} color={Colors.text} fill={Colors.text} />
                            </Pressable>
                            <Pressable style={styles.playPauseButton} onPress={togglePlayPause}>
                                {isPlaying ? (
                                    <Pause size={24} color={Colors.background} fill={Colors.background} />
                                ) : (
                                    <Play size={24} color={Colors.background} fill={Colors.background} />
                                )}
                            </Pressable>
                            <Pressable onPress={playNext}>
                                <SkipForward size={24} color={Colors.text} fill={Colors.text} />
                            </Pressable>
                        </View>
                    </View>
                )}
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
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingVertical: 10,
    },
    backButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: 'rgba(255,255,255,0.1)',
        alignItems: 'center',
        justifyContent: 'center',
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: Colors.text,
    },
    albumHeader: {
        alignItems: 'center',
        paddingVertical: 20,
    },
    coverImage: {
        width: 240,
        height: 240,
        borderRadius: 20,
        marginBottom: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.5,
        shadowRadius: 15,
    },
    title: {
        fontSize: 28,
        fontWeight: '800',
        color: Colors.text,
        textAlign: 'center',
    },
    year: {
        fontSize: 18,
        color: Colors.accent,
        fontWeight: '600',
        marginTop: 5,
    },
    songList: {
        paddingHorizontal: 20,
        paddingBottom: 100,
    },
    songItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 15,
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(255,255,255,0.05)',
    },
    activeSongItem: {
        backgroundColor: 'rgba(255,255,255,0.05)',
        borderRadius: 12,
        paddingHorizontal: 10,
        marginHorizontal: -10,
    },
    songMain: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 15,
    },
    songTitle: {
        fontSize: 16,
        color: Colors.text,
        fontWeight: '500',
    },
    activeSongTitle: {
        color: Colors.primary,
        fontWeight: '700',
    },
    duration: {
        fontSize: 14,
        color: Colors.textSecondary,
    },
    playerBar: {
        position: 'absolute',
        bottom: 20,
        left: 20,
        right: 20,
        backgroundColor: Colors.card,
        borderRadius: 25,
        flexDirection: 'row',
        alignItems: 'center',
        padding: 12,
        paddingHorizontal: 20,
        borderWidth: 1,
        borderColor: Colors.border,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
    },
    playerInfo: {
        flex: 1,
    },
    playerSongTitle: {
        fontSize: 14,
        fontWeight: '700',
        color: Colors.text,
    },
    playerAlbumTitle: {
        fontSize: 12,
        color: Colors.textSecondary,
    },
    controls: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 15,
    },
    playPauseButton: {
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: Colors.text,
        alignItems: 'center',
        justifyContent: 'center',
    },
});
