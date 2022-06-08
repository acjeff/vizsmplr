import React from 'react';
import 'react-html5video/dist/styles.css';

const video_url = 'https://firebasestorage.googleapis.com/v0/b/vizsmplr.appspot.com/o/kendricklamarn.mp4?alt=media&token=ccf53a44-5a78-49ca-9c56-6de335e09fbd';

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

        return <video ref={this.videoSampleRef} style={{
            pointerEvents: 'none',
            maxWidth: this.props.w + '%',
            maxHeight: this.props.h + '%'
        }}
                      loop muted
                      onTimeUpdate={() => {
                          if (this.videoSampleRef.current && this.videoSampleRef.current.currentTime > this.props.end) {
                              this.videoSampleRef.current.currentTime = this.props.start;
                          }
                      }}>
            <source src={video_url} type="video/mp4"/>
        </video>
    }
}

export default VideoSample;