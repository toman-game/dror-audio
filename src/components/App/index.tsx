import React, {useEffect, useState} from 'react';
import styles from './styles.module.css'
import {SongData, simulateHttpRequest_getSongData} from "../../mockData/utils";

const emptySong = {artist: "", audioSrc: "", imgSrc: "", title: ""};

function App() {
    const [songIndex, setSongIndex] = useState(0);
    const [songData, setSongData] = useState<SongData>(emptySong);
    const [audio, setAudio] = useState<HTMLAudioElement | null>(null);

    useEffect(() => {
        fetchSongData(0);
    }, []);

    async function fetchSongData (index: number) {
      pause();
      const newSongData = await simulateHttpRequest_getSongData(index);
      setSongData(newSongData);
      const newAudio = new Audio(newSongData.audioSrc);
      newAudio.currentTime = 0;
      setAudio(newAudio);
      newAudio.play();
    }

    function play() {
       if (audio) {
           audio.play().catch((e) => {
               console.error('Failed to play sound:', e);
           });
       }
    }

    function pause() {
        if (audio) {
            audio.pause();
        }
    }

    function goNextSong() {
        setSongIndex(songIndex + 1);
        fetchSongData(songIndex + 1);
    }

    function goPrvSong() {
        setSongIndex(songIndex - 1);
        fetchSongData(songIndex - 1);
    }

  return (
    <div className={styles.root}>
        <div className={styles.background}>
            <h1 className={styles.title}>Dror Audio App</h1>
            <div className={styles.songContent}>
                <img src={songData.imgSrc} className={styles.songImg} />
                <div>
                    <p className={styles.songTitle}>{songData.title}</p>
                    <p className={styles.songArtist}><b>By: </b>{songData.artist}</p>
                    <div className={styles.buttons}>
                        <button onClick={pause}><i className="fas fa-pause"/></button>
                        <button onClick={play}><i className="fas fa-play"/></button>
                    </div>
                </div>
            </div>

            <div className={styles.buttons}>
                <button onClick={goPrvSong}><i className="fas fa-arrow-left"/>&nbsp; previous</button>
                <button onClick={goNextSong}>next &nbsp;<i className="fas fa-arrow-right"/></button>
            </div>

        </div>
    </div>
  );
}

export default App;
