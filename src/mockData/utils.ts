import mockData from './index.json';

export type SongData = {
    audioSrc: string;
    title: string;
    artist: string;
    imgSrc: string;
}

export async function simulateHttpRequest_getSongData(songIndex: number): Promise<SongData> {
    const indexInRange = Math.abs(songIndex % mockData.length);
    const songData = mockData[indexInRange];
    return Promise.resolve(songData);
}

