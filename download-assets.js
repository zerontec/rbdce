const fs = require('fs');
const https = require('https');
const path = require('path');

const members = [
    { name: 'anahi.jpg', url: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=800&q=80' },
    { name: 'dulce.jpg', url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&q=80' },
    { name: 'maite.jpg', url: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=800&q=80' },
    { name: 'poncho.jpg', url: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=800&q=80' },
    { name: 'christopher.jpg', url: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=800&q=80' },
    { name: 'christian.jpg', url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80' },
];

const albums = [
    { name: 'rebelde.jpg', url: 'https://placehold.co/600x600/000000/FFFFFF/png?text=Rebelde' },
    { name: 'nuestro_amor.jpg', url: 'https://placehold.co/600x600/FF0000/FFFFFF/png?text=Nuestro+Amor' },
    { name: 'celestial.jpg', url: 'https://placehold.co/600x600/0000FF/FFFFFF/png?text=Celestial' },
    { name: 'rebels.jpg', url: 'https://placehold.co/600x600/FF00FF/FFFFFF/png?text=Rebels' },
    { name: 'empezar.jpg', url: 'https://placehold.co/600x600/FFFF00/000000/png?text=Empezar+Desde+Cero' },
    { name: 'para_olvidarme.jpg', url: 'https://placehold.co/600x600/00FFFF/000000/png?text=Para+Olvidarme+De+Ti' },
];

const ensureDir = (dir) => {
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }
}

const download = (url, dest) => {
    return new Promise((resolve, reject) => {
        const file = fs.createWriteStream(dest);
        const options = {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
            }
        };
        https.get(url, options, (response) => {
            if (response.statusCode !== 200) {
                reject(new Error(`Failed to download ${url}: ${response.statusCode}`));
                return;
            }
            response.pipe(file);
            file.on('finish', () => {
                file.close(() => resolve(dest));
            });
        }).on('error', (err) => {
            fs.unlink(dest, () => { });
            reject(err);
        });
    });
};

const run = async () => {
    const assetsDir = path.join(__dirname, 'assets');
    ensureDir(path.join(assetsDir, 'members'));
    ensureDir(path.join(assetsDir, 'albums'));

    console.log('Downloading members...');
    for (const member of members) {
        try {
            await download(member.url, path.join(assetsDir, 'members', member.name));
            console.log(`Downloaded ${member.name}`);
            await new Promise(r => setTimeout(r, 2000)); // 2 second delay
        } catch (error) {
            console.error(`Error downloading ${member.name}:`, error.message);
        }
    }

    console.log('Downloading albums...');
    for (const album of albums) {
        try {
            await download(album.url, path.join(assetsDir, 'albums', album.name));
            console.log(`Downloaded ${album.name}`);
            await new Promise(r => setTimeout(r, 2000)); // 2 second delay
        } catch (error) {
            console.error(`Error downloading ${album.name}:`, error.message);
        }
    }
};

run();
