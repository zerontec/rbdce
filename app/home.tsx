import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { BookOpen, Disc, Users, ArrowRight } from 'lucide-react-native';
import React from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View, Dimensions, Animated } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import Colors from '@/constants/colors';
import { members } from '@/mocks/rbd-data';

const { width } = Dimensions.get('window');

export default function HomeScreen() {
    const router = useRouter();

    const menuItems = [
        {
            id: 'history',
            title: 'Historia',
            subtitle: 'El fenómeno RBD',
            icon: BookOpen,
            color: Colors.primary,
            route: '/history',
        },
        {
            id: 'discography',
            title: 'Discografía',
            subtitle: 'Toda su música',
            icon: Disc,
            color: Colors.secondary,
            route: '/discography',
        },
    ];

    const fadeAnim = React.useRef(new Animated.Value(0)).current;
    const slideAnim = React.useRef(new Animated.Value(50)).current;

    React.useEffect(() => {
        Animated.parallel([
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 1000,
                useNativeDriver: true,
            }),
            Animated.timing(slideAnim, {
                toValue: 0,
                duration: 800,
                useNativeDriver: true,
            }),
        ]).start();
    }, []);

    return (
        <View style={styles.container}>
            <LinearGradient
                colors={['#300', Colors.background]}
                style={StyleSheet.absoluteFill}
            />

            <SafeAreaView style={styles.safeArea}>
                <Animated.ScrollView
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={styles.scrollContent}
                    style={{ opacity: fadeAnim, transform: [{ translateY: slideAnim }] }}
                >
                    <View style={styles.header}>
                        <Text style={styles.greeting}>¡Hola, Carmen Elena!</Text>
                        <Text style={styles.title}>Tu  Mundo RBD</Text>
                    </View>

                    <Pressable onPress={() => router.push('/tour')}>
                        <View style={styles.heroCard}>
                            <Image
                                source={require('../assets/tour_bg.jpg')}
                                style={styles.heroImage}
                                contentFit="cover"
                            />
                            <LinearGradient
                                colors={['transparent', 'rgba(0,0,0,0.8)']}
                                style={styles.heroGradient}
                            />
                            <View style={styles.heroContent}>
                                <Text style={styles.heroTag}>DESTACADO</Text>
                                <Text style={styles.heroTitle}>Soy Rebelde Tour 2023</Text>
                                <Text style={styles.heroSubtitle}>Revive los mejores momentos</Text>
                            </View>
                        </View>
                    </Pressable>

                    <View style={styles.menuGrid}>
                        {menuItems.map((item) => (
                            <Pressable
                                key={item.id}
                                style={styles.menuItem}
                                onPress={() => router.push(item.route as any)}
                            >
                                <View style={[styles.iconContainer, { backgroundColor: item.color + '20' }]}>
                                    <item.icon size={28} color={item.color} />
                                </View>
                                <View style={styles.menuText}>
                                    <Text style={styles.menuTitle}>{item.title}</Text>
                                    <Text style={styles.menuSubtitle}>{item.subtitle}</Text>
                                </View>
                                <ArrowRight size={20} color={Colors.textSecondary} />
                            </Pressable>
                        ))}
                    </View>



                    <View style={styles.membersSection}>
                        <View style={styles.sectionHeader}>
                            <Text style={styles.sectionTitle}>Integrantes</Text>
                            <Users size={20} color={Colors.primary} />
                        </View>
                        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.membersScroll}>
                            {members.map((member, i) => (
                                <Pressable key={i} style={styles.memberAvatarContainer} onPress={() => router.push(`/member/${member.name}`)}>
                                    <View style={styles.avatar}>
                                        <Image
                                            source={member.photo}
                                            style={{ width: '100%', height: '100%' }}
                                            contentFit="cover"
                                        />
                                    </View>
                                    <Text style={styles.memberName}>{member.name.split(' ')[0]}</Text>
                                </Pressable>
                            ))}
                        </ScrollView>
                    </View>

                    <View style={styles.footer}>
                        <Text style={styles.footerText}>Generación RBD © 2026</Text>
                        <Text style={styles.footerTagline}>Yo digo R, tú dices BD...</Text>
                    </View>
                </Animated.ScrollView>
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
    scrollContent: {
        padding: 20,
    },
    header: {
        marginBottom: 24,
    },
    greeting: {
        fontSize: 16,
        color: Colors.primary,
        fontWeight: '600',
        letterSpacing: 1,
    },
    title: {
        fontSize: 32,
        fontWeight: '900',
        color: Colors.text,
        marginTop: 4,
    },
    heroCard: {
        height: 200,
        borderRadius: 24,
        overflow: 'hidden',
        marginBottom: 30,
        position: 'relative',
        elevation: 8,
        shadowColor: Colors.primary,
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.3,
        shadowRadius: 20,
    },
    heroImage: {
        width: '100%',
        height: '100%',
    },
    heroGradient: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: '60%',
    },
    heroContent: {
        position: 'absolute',
        bottom: 20,
        left: 20,
    },
    heroTag: {
        color: Colors.primary,
        fontSize: 10,
        fontWeight: '800',
        letterSpacing: 2,
        marginBottom: 4,
    },
    heroTitle: {
        color: Colors.text,
        fontSize: 24,
        fontWeight: '800',
    },
    heroSubtitle: {
        color: Colors.textSecondary,
        fontSize: 14,
        marginTop: 2,
    },
    menuGrid: {
        gap: 16,
        marginBottom: 30,
    },
    menuItem: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Colors.card,
        borderRadius: 20,
        padding: 16,
        borderWidth: 1,
        borderColor: Colors.border,
    },
    iconContainer: {
        width: 56,
        height: 56,
        borderRadius: 16,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 16,
    },
    menuText: {
        flex: 1,
    },
    menuTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: Colors.text,
    },
    menuSubtitle: {
        fontSize: 14,
        color: Colors.textSecondary,
        marginTop: 2,
    },
    membersSection: {
        marginBottom: 30,
    },
    sectionHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 16,
        paddingHorizontal: 4,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: '800',
        color: Colors.text,
    },
    membersScroll: {
        marginLeft: -4,
    },
    memberAvatarContainer: {
        alignItems: 'center',
        marginRight: 20,
    },
    avatar: {
        width: 64,
        height: 64,
        borderRadius: 32,
        backgroundColor: Colors.card,
        borderWidth: 2,
        borderColor: Colors.border,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 8,
        overflow: 'hidden',
    },
    avatarText: {
        fontSize: 20,
        fontWeight: '800',
        color: Colors.primary,
    },
    memberName: {
        fontSize: 12,
        color: Colors.textSecondary,
        fontWeight: '500',
    },
    footer: {
        alignItems: 'center',
        marginTop: 20,
        paddingBottom: 40,
    },
    footerText: {
        color: Colors.textSecondary,
        fontSize: 12,
        opacity: 0.5,
    },
    footerTagline: {
        color: Colors.primary,
        fontSize: 14,
        fontStyle: 'italic',
        marginTop: 4,
        opacity: 0.8,
    },
});
