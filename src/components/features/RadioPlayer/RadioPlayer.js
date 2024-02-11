import React, { useState, useRef, useEffect } from 'react';
import { Button, Dropdown, Form, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faVolumeUp, faVolumeMute } from '@fortawesome/free-solid-svg-icons';
import styles from './RadioPlayer.module.scss';

function RadioPlayer() {
    const [isPlaying, setIsPlaying] = useState(false);
    const [volume, setVolume] = useState(() => {
        const savedVolume = localStorage.getItem('volume');
        return savedVolume !== null ? parseFloat(savedVolume) : 1;
    });
    const [lastVolume, setLastVolume] = useState(volume);
    const audioRef = useRef(null);

    const togglePlayPause = () => {
        const nextState = !isPlaying;
        setIsPlaying(nextState);
        localStorage.setItem('isPlaying', nextState.toString());
        if (audioRef.current) {
            nextState ? audioRef.current.play() : audioRef.current.pause();
        }
    };

    useEffect(() => {
        const savedIsPlaying = localStorage.getItem('isPlaying') === 'true';
        setIsPlaying(savedIsPlaying);

        if (audioRef.current) {
            audioRef.current.volume = volume;
            if (savedIsPlaying) {
                audioRef.current.play().catch(error => {
                    console.error("Nie można automatycznie odtworzyć dźwięku:", error);
                    setIsPlaying(false);
                });
            }
        }
    }, [volume]);

    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.volume = volume;
        }
        localStorage.setItem('volume', volume.toString());
    }, [volume]);

    const isMuted = volume === 0;

    const toggleMute = () => {
        if (!isMuted) {
            setLastVolume(volume);
            setVolume(0);
        } else {
            setVolume(lastVolume);
        }
    };

    const renderTooltip = (props) => (
        <Tooltip id="button-tooltip" {...props}>
            Ibiza Global Radio
        </Tooltip>
    );

    return (
        <div>
            <audio ref={audioRef} preload="none">
                <source src="https://listenssl.ibizaglobalradio.com:8024/ibizaglobalradio.mp3" type="audio/mp3" />
            </audio>
            <Dropdown as={Button.Group}>
                <OverlayTrigger placement="left" overlay={renderTooltip}>
                    <Button variant={isPlaying ? 'danger opacity-75' : 'success opacity-75'} onClick={togglePlayPause}>
                        {isPlaying ? 'Pause' : 'Play'}
                    </Button>
                </OverlayTrigger>

                <Dropdown.Toggle split variant={isPlaying ? 'danger opacity-75' : 'success opacity-75'} />

                <Dropdown.Menu style={{ padding: '0px', marginTop: '5px', backgroundColor: 'black' }}>
                    <div className={styles['volume-container']} style={{ padding: '0px' }}>
                        <FontAwesomeIcon
                            icon={isMuted ? faVolumeMute : faVolumeUp}
                            onClick={toggleMute}
                            className={`${styles['volume-icon']} ${isMuted ? styles['muted'] : ''}`}
                        />
                        <Form.Control
                            type="range"
                            min="0"
                            max="1"
                            step="0.05"
                            value={volume}
                            onChange={(e) => setVolume(parseFloat(e.target.value))}
                            className={styles['volume-slider']}
                            style={{ backgroundColor: 'black', boxShadow: 'none', outline: 'none' }}
                        />
                    </div>
                </Dropdown.Menu>
            </Dropdown>
        </div>
    );
}

export default RadioPlayer;