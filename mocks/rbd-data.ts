export interface Song {
    id: string;
    title: string;
    duration: string;
    audioUrl: string;
}

export interface Album {
    id: string;
    title: string;
    year: string;
    cover: any;
    songs: Song[];
    spotifyLink?: string;
    youtubeLink?: string;
}

export interface Member {
    name: string;
    character: string;
    image?: string;
    bio: string;
    photo: any;
}

export interface TimelineItem {
    year: string;
    title: string;
    description: string;
}

export const members: Member[] = [
    {
        name: 'Anahí',
        character: 'Mía Colucci',
        photo: require('../assets/members/anahi.jpg'),
        bio: 'Conocida por interpretar a Mía Colucci, la reina del estilo y el drama. Anahí comenzó su carrera a los dos años en "Chiquilladas". Es la voz de éxitos como "Sálvame" y un ícono de la moda pop de los 2000.'
    },
    {
        name: 'Dulce María',
        character: 'Roberta Pardo',
        photo: require('../assets/members/dulce.jpg'),
        bio: 'Dio vida a la rebelde Roberta Pardo. Dulce María destaca por su voz rockera y su cabello rojo intenso. Compositora y actriz, trajo la actitud fuerte y la sensibilidad a temas como "No Pares".'
    },
    {
        name: 'Maite Perroni',
        character: 'Lupita Fernández',
        photo: require('../assets/members/maite.jpg'),
        bio: 'Interpretó a la dulce Lupita Fernández. Maite se consolidó como una de las actrices más importantes de México tras RBD. Su voz suave es esencial en baladas como "Empezar Desde Cero".'
    },
    {
        name: 'Alfonso Herrera',
        character: 'Miguel Arango',
        photo: require('../assets/members/alfonso.jpg'),
        bio: 'El carismático Miguel Arango. Poncho decidió enfocarse en la actuación tras la separación del grupo, logrando una exitosa carrera internacional en series y cine.'
    },
    {
        name: 'Christopher Uckermann',
        character: 'Diego Bustamante',
        photo: require('../assets/members/christopher.jpg'),
        bio: 'Diego Bustamante en la ficción. Christopher es músico, compositor y actor. Aportó un estilo único a la banda y compuso temas como "Sueles Volver".'
    },
    {
        name: 'Christian Chávez',
        character: 'Giovanni Méndez',
        photo: require('../assets/members/crhistian.jpg'),
        bio: 'El divertido Giovanni Méndez. Christian destaca por su increíble rango vocal y su energía en el escenario. Es un referente de libertad y autenticidad.'
    },
];

export const historyTimeline: TimelineItem[] = [
    {
        year: '2004',
        title: 'El Comienzo',
        description: 'Se estrena la telenovela Rebelde y nace el grupo RBD.',
    },
    {
        year: '2005',
        title: 'Tour Generación',
        description: 'Primera gira internacional y lanzamiento de "Nuestro Amor".',
    },
    {
        year: '2006',
        title: 'Fenómeno Mundial',
        description: 'Conquistan Brasil, España y Estados Unidos.',
    },
    {
        year: '2008',
        title: 'El Adiós',
        description: 'Anuncian su separación tras cuatro años de éxito rotundo.',
    },
    {
        year: '2023',
        title: 'Soy Rebelde Tour',
        description: 'El esperado reencuentro que rompió récords de asistencia.',
    },
];

export const albums: Album[] = [
    {
        id: '1',
        title: 'Rebelde',
        year: '2004',
        cover: require('../assets/albums/rebelde.jpg'),
        spotifyLink: 'https://open.spotify.com/search/RBD%20Rebelde%20Album',
        youtubeLink: 'https://www.youtube.com/results?search_query=RBD+Rebelde+Album+Completo',
        songs: [
            { id: '101', title: 'Rebelde', duration: '3:32', audioUrl: '' },
            { id: '102', title: 'Solo Quédate En Silencio', duration: '3:37', audioUrl: '' },
            { id: '103', title: 'Sálvame', duration: '3:43', audioUrl: '' },
        ],
    },
    {
        id: '2',
        title: 'Nuestro Amor',
        year: '2005',
        cover: require('../assets/albums/nuestro_amor.jpg'),
        spotifyLink: 'https://open.spotify.com/search/RBD%20Nuestro%20Amor',
        youtubeLink: 'https://www.youtube.com/results?search_query=RBD+Nuestro+Amor+Album+Completo',
        songs: [
            { id: '201', title: 'Nuestro Amor', duration: '3:34', audioUrl: '' },
            { id: '202', title: 'Este Corazón', duration: '3:30', audioUrl: '' },
            { id: '203', title: 'Aún Hay Algo', duration: '3:33', audioUrl: '' },
        ],
    },
    {
        id: '3',
        title: 'Celestial',
        year: '2006',
        cover: require('../assets/albums/celestial.jpg'),
        spotifyLink: 'https://open.spotify.com/search/RBD%20Celestial',
        youtubeLink: 'https://www.youtube.com/results?search_query=RBD+Celestial+Album+Completo',
        songs: [
            { id: '301', title: 'Ser O Parecer', duration: '3:31', audioUrl: '' },
            { id: '302', title: 'Celestial', duration: '3:27', audioUrl: '' },
            { id: '303', title: 'Bésame Sin Miedo', duration: '3:32', audioUrl: '' },
        ],
    },
    {
        id: '4',
        title: 'Rebels',
        year: '2006',
        cover: require('../assets/albums/rebels.jpg'),
        spotifyLink: 'https://open.spotify.com/search/RBD%20Rebels',
        youtubeLink: 'https://www.youtube.com/results?search_query=RBD+Rebels+Album',
        songs: [
            { id: '401', title: 'Tu Amor', duration: '4:38', audioUrl: '' },
            { id: '402', title: 'Wanna Play', duration: '3:41', audioUrl: '' },
        ],
    },
    {
        id: '5',
        title: 'Empezar Desde Cero',
        year: '2007',
        cover: require('../assets/albums/empezar.jpg'),
        spotifyLink: 'https://open.spotify.com/search/RBD%20Empezar%20Desde%20Cero',
        youtubeLink: 'https://www.youtube.com/results?search_query=RBD+Empezar+Desde+Cero+Album',
        songs: [
            { id: '501', title: 'Empezar Desde Cero', duration: '3:14', audioUrl: '' },
            { id: '502', title: 'Inalcanzable', duration: '4:14', audioUrl: '' },
        ],
    },
    {
        id: '6',
        title: 'Para Olvidarme De Ti',
        year: '2009',
        cover: require('../assets/albums/para_olvidarme.jpg'),
        spotifyLink: 'https://open.spotify.com/search/RBD%20Para%20Olvidarme%20De%20Ti',
        youtubeLink: 'https://www.youtube.com/results?search_query=RBD+Para+Olvidarme+De+Ti+Album',
        songs: [
            { id: '601', title: 'Para Olvidarme De Ti', duration: '3:21', audioUrl: '' },
            { id: '602', title: 'Adiós', duration: '3:36', audioUrl: '' },
        ],
    },
];
export const tourSetlist = [
    { title: 'Tras de Mí', album: 'Nuestro Amor' },
    { title: 'Un Poco de Tu Amor', album: 'Rebelde' },
    { title: 'Cerquita de Ti', album: 'Single' },
    { title: 'Aún Hay Algo', album: 'Nuestro Amor' },
    { title: 'Otro Día Que Va', album: 'Rebelde' },
    { title: 'Inalcanzable', album: 'Empezar Desde Cero' },
    { title: 'Medley Eras', album: 'Varios' },
    { title: 'Enséñame', album: 'Rebelde' },
    { title: 'Qué Hay Detrás', album: 'Nuestro Amor' },
    { title: 'Tu Amor', album: 'Rebels' },
    { title: 'Celestial', album: 'Celestial' },
    { title: 'Bésame Sin Miedo', album: 'Celestial' },
    { title: 'Ser o Parecer', album: 'Celestial' },
    { title: 'No Pares', album: 'Live' },
    { title: 'Este Corazón', album: 'Nuestro Amor' },
    { title: 'Siempre He Estado Aquí', album: 'Single' },
    { title: 'Empezar Desde Cero', album: 'Empezar Desde Cero' },
    { title: 'Solo Quédate en Silencio', album: 'Rebelde' },
    { title: 'Sálvame', album: 'Rebelde' },
    { title: 'Nuestro Amor', album: 'Nuestro Amor' },
    { title: 'Rebelde', album: 'Rebelde' },
];
