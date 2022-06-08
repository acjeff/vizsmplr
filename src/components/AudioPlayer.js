import React from 'react';
const audio_url = 'https://firebasestorage.googleapis.com/v0/b/vizsmplr.appspot.com/o/Kendrick-Lamar-N95.mp3?alt=media&token=8e9e1095-80bb-4cf6-8925-6c497a7c1f36';

class AudioPlayer extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            playing: false
        };
        this.audioRef = React.createRef();
        this.playPause = this.playPause.bind(this);
    }

    playPause () {
        if (this.audioRef.current) {
            let audio = this.audioRef.current;
            console.log(audio, ' : audio')
            if (audio.currentTime > 0 && !audio.paused && !audio.ended
                && audio.readyState > audio.HAVE_CURRENT_DATA) {
                audio.pause();
                this.setState({playing: false});
            }
            else {
                audio.play();
                this.setState({playing: true});
            }

        }
    }

    componentDidMount() {
    }

    componentWillUnmount() {
    }

    render() {
        return <div className={'audio-wrapper'}>
            <p onClick={this.playPause}>{this.state.playing ? 'Pause' : 'Play'}</p>
            <audio onCanPlayThrough={this.playPause} ref={this.audioRef} style={{width: '100%', position: 'fixed', bottom: 0, pointerEvents: 'none', opacity: 0}}
                   src={audio_url}/>
        </div>
    }
}

export default AudioPlayer;