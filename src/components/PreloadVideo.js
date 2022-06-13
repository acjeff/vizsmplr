import React from 'react';
import Sampler from "./Sampler";
import AudioPlayer from "./AudioPlayer";

const kendrick_video_url = 'https://firebasestorage.googleapis.com/v0/b/vizsmplr.appspot.com/o/kendrick_720.mp4?alt=media&token=a8c60bb4-f397-424d-bcea-f22dfb6e93bf';
const rosalia_video_url = 'https://firebasestorage.googleapis.com/v0/b/vizsmplr.appspot.com/o/rosalia-saoko.mp4?alt=media&token=44c0c141-3e8c-4e6b-ba7d-140310cef7df';

class PreloadVideo extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            playing: false
        };
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        let v = urlParams.get('v');
        this.audioRef = React.createRef();
        this.video_url = kendrick_video_url;
        this.videoLength = 345;
        if (v === 'rosalia') {
            this.videoLength = 283;
            this.video_url = rosalia_video_url;
        }
    }

    componentDidMount() {
        if (this.loadingVideo) return;
        let self = this;
        let req = new XMLHttpRequest();
        req.open('GET', this.video_url, true);
        // req.setRequestHeader('Access-Control-Allow-Origin', '*');
        // req.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
        req.responseType = 'blob';
        console.log('load video')
        this.loadingVideo = true;
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
        req.onprogress = function (e) {
            console.log(e, ' : e');
            self.setState({loading: (e.loaded / e.total) * 100})
        }
        req.onerror = function (e) {
            console.log(e, ' : error');
        }

        req.send();
    }

    render() {
        if (this.state.video_src) {
            return [
                (<Sampler key={1} videoSrc={this.state.video_src} videoLength={this.videoLength}/>),
                (<AudioPlayer key={2}/>)
            ]
        } else {
            return <div style={{
                color: 'white',
                position: 'fixed',
                width: '100%',
                top: '50%'
            }}>
                <div className={'loading-wrapper'}><span
                    style={{width: this.state.loading + '%', textAlign: 'center'}}>LOADING</span></div>
            </div>
        }
    }
}

export default PreloadVideo;