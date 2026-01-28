import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { ArrowLeft, Calendar, Star } from 'lucide-react-native';
import React from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import Colors from '@/constants/colors';
import { historyTimeline, members } from '@/mocks/rbd-data';

export default function HistoryScreen() {
    const router = useRouter();

    return (
        <View style={styles.container}>
            <LinearGradient
                colors={[Colors.primary, Colors.background]}
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
                    <Text style={styles.headerTitle}>Historia de RBD</Text>
                    <View style={styles.backButton} />
                </View>

                <ScrollView
                    style={styles.scrollView}
                    contentContainerStyle={styles.scrollContent}
                    showsVerticalScrollIndicator={false}
                >
                    <View style={styles.intro}>
                        <Text style={styles.introTitle}>
                            El Fenómeno que Conquistó el Mundo
                        </Text>
                        <Text style={styles.introText}>
                            RBD fue un grupo musical mexicano formado en 2004, que se convirtió
                            en uno de los fenómenos más importantes de la música latina. Con
                            más de 50 millones de discos vendidos y giras mundiales agotadas,
                            RBD marcó una generación.
                        </Text>
                    </View>

                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Línea de Tiempo</Text>
                        {historyTimeline.map((item, index) => (
                            <View key={index} style={styles.timelineItem}>
                                <View style={styles.timelineLeft}>
                                    <View style={styles.timelineDot} />
                                    {index < historyTimeline.length - 1 && (
                                        <View style={styles.timelineLine} />
                                    )}
                                </View>
                                <View style={styles.timelineContent}>
                                    <View style={styles.yearBadge}>
                                        <Calendar size={16} color={Colors.primary} />
                                        <Text style={styles.yearText}>{item.year}</Text>
                                    </View>
                                    <Text style={styles.timelineTitle}>{item.title}</Text>
                                    <Text style={styles.timelineDescription}>
                                        {item.description}
                                    </Text>
                                </View>
                            </View>
                        ))}
                    </View>

                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Integrantes</Text>
                        <View style={styles.membersGrid}>
                            {members.map((member, index) => (
                                <View key={index} style={styles.memberCard}>
                                    <View style={styles.memberIcon}>
                                        <Star size={24} color={Colors.secondary} fill={Colors.secondary} />
                                    </View>
                                    <Text style={styles.memberName}>{member.name}</Text>
                                    <Text style={styles.memberCharacter}>{member.character}</Text>
                                </View>
                            ))}
                        </View>
                    </View>

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
        marginBottom: 32,
    },
    introTitle: {
        fontSize: 28,
        fontWeight: '800' as const,
        color: Colors.text,
        marginBottom: 16,
        lineHeight: 36,
    },
    introText: {
        fontSize: 16,
        color: Colors.textSecondary,
        lineHeight: 24,
    },
    section: {
        marginBottom: 32,
    },
    sectionTitle: {
        fontSize: 22,
        fontWeight: '700' as const,
        color: Colors.text,
        marginBottom: 20,
    },
    timelineItem: {
        flexDirection: 'row' as const,
        marginBottom: 24,
    },
    timelineLeft: {
        alignItems: 'center' as const,
        marginRight: 16,
    },
    timelineDot: {
        width: 16,
        height: 16,
        borderRadius: 8,
        backgroundColor: Colors.primary,
        borderWidth: 3,
        borderColor: Colors.background,
        marginTop: 4,
    },
    timelineLine: {
        width: 2,
        flex: 1,
        backgroundColor: Colors.border,
        marginTop: 4,
    },
    timelineContent: {
        flex: 1,
        paddingBottom: 8,
    },
    yearBadge: {
        flexDirection: 'row' as const,
        alignItems: 'center' as const,
        gap: 6,
        backgroundColor: Colors.card,
        alignSelf: 'flex-start' as const,
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 12,
        marginBottom: 8,
    },
    yearText: {
        fontSize: 14,
        fontWeight: '600' as const,
        color: Colors.primary,
    },
    timelineTitle: {
        fontSize: 18,
        fontWeight: '700' as const,
        color: Colors.text,
        marginBottom: 6,
    },
    timelineDescription: {
        fontSize: 15,
        color: Colors.textSecondary,
        lineHeight: 22,
    },
    membersGrid: {
        flexDirection: 'row' as const,
        flexWrap: 'wrap' as const,
        gap: 12,
    },
    memberCard: {
        width: '47%' as const,
        backgroundColor: Colors.card,
        borderRadius: 16,
        padding: 16,
        alignItems: 'center' as const,
        borderWidth: 1,
        borderColor: Colors.border,
    },
    memberIcon: {
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: Colors.background,
        alignItems: 'center' as const,
        justifyContent: 'center' as const,
        marginBottom: 12,
    },
    memberName: {
        fontSize: 16,
        fontWeight: '700' as const,
        color: Colors.text,
        marginBottom: 4,
    },
    memberCharacter: {
        fontSize: 13,
        color: Colors.textSecondary,
        textAlign: 'center' as const,
    },
    bottomPadding: {
        height: 40,
    },
});
