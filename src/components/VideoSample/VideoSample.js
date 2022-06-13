import React from 'react';
import 'react-html5video/dist/styles.css';

class VideoSample extends React.Component {

    constructor(props) {
        super(props);
        this.state = {};
        this.videoSampleRef = React.createRef();
    }


    componentDidMount() {
        if (this.videoSampleRef.current) {
            let video = this.videoSampleRef.current;
            console.log(this.videoSampleRef.current, ' : this.videoSampleRef.element');
            this.videoSampleRef.current.currentTime = this.props.start;
            let isPlaying = video.currentTime > 0 && !video.paused && !video.ended
                && video.readyState > video.HAVE_CURRENT_DATA;

            if (!isPlaying) {
                // window.setTimeout(()=> {
                video.play();
                // }, 100);
            }
        }
    }

    render() {

        return <div style={{
            pointerEvents: 'none',
            maxWidth: this.props.w + '%',
            maxHeight: this.props.h + '%',
            position: 'relative',
            overflow: 'hidden',
            display: 'flex',
            justifyContent: 'center'
        }} className={'video-wrapper'}>
            <video muted style={{maxWidth: '100%', maxHeight: '100%'}} ref={this.videoSampleRef}
                      onTimeUpdate={() => {
                          if (this.videoSampleRef.current && this.videoSampleRef.current.currentTime > this.props.end) {
                              this.videoSampleRef.current.currentTime = this.props.start;
                          }
                      }}>
            <source src={this.props.videoSrc} type="video/mp4"/>
        </video></div>
    }
}

export default VideoSample;