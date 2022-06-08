import React from 'react';
import Sampler from "./Sampler";
import AudioPlayer from "./AudioPlayer";

const video_url = 'https://firebasestorage.googleapis.com/v0/b/vizsmplr.appspot.com/o/kendricklamarn.mp4?alt=media&token=ccf53a44-5a78-49ca-9c56-6de335e09fbd';

class PreloadVideo extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            playing: false
        };
    }

    componentDidMount() {
        let self = this;
        let req = new XMLHttpRequest();
        req.open('GET', video_url, true);
        // req.setRequestHeader('Access-Control-Allow-Origin', '*');
        // req.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
        req.responseType = 'blob';
        console.log('load video')
        req.onload = function () {
            // Onload is triggered even on 404
            // so we need to check the status code
            if (this.status === 200) {
                let videoBlob = this.response;
                let vid = URL.createObjectURL(videoBlob); // IE10+
                // Video is now downloaded
                // and we can set it as source on the video element
                console.log(vid, ' : video loaded');
                self.setState({video_src: vid});
            }
        }
        req.onerror = function (e) {
            console.log(e, ' : error');
            // Error
        }

        req.send();
    }

    componentWillUnmount() {
    }

    render() {
        if (this.state.video_src) {
            return [
                (<Sampler videoSrc={this.state.video_src}/>),
                (<AudioPlayer/>)
            ]
        } else {
            return <p style={{
                color: 'white',
                position: 'fixed',
                width: '100%',
                top: '50%'
            }}>LOADING...</p>
        }
    }
}

export default PreloadVideo;