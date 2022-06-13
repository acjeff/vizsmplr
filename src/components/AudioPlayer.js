import React from 'react';

const kendrick_audio_url = 'https://firebasestorage.googleapis.com/v0/b/vizsmplr.appspot.com/o/Kendrick-Lamar-N95.mp3?alt=media&token=8e9e1095-80bb-4cf6-8925-6c497a7c1f36';
const rosalia_audio_url = 'https://firebasestorage.googleapis.com/v0/b/vizsmplr.appspot.com/o/ROSALI%CC%81A-SAOKO.mp3?alt=media&token=fdf078cb-d933-434f-8295-aa094f7b44aa';

class AudioPlayer extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            playing: false
        };
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        let v = urlParams.get('v');
        this.audioRef = React.createRef();
        this.playPause = this.playPause.bind(this);
        this.audio_url = kendrick_audio_url;
        if (v === 'rosalia') {
            this.audio_url = rosalia_audio_url;
        }

    }

    playPause() {
        if (this.audioRef.current) {
            let audio = this.audioRef.current;
            console.log(audio, ' : audio')
            if (audio.currentTime > 0 && !audio.paused && !audio.ended
                && audio.readyState > audio.HAVE_CURRENT_DATA) {
                audio.pause();
                this.setState({playing: false});
            } else {
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
            <audio ref={this.audioRef}
                   style={{width: '100%', position: 'fixed', bottom: 0, pointerEvents: 'none', opacity: 0}}
                   src={this.audio_url}/>
        </div>
    }
}

export default AudioPlayer;