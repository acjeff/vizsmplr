import React from 'react';
import VideoSample from "./VideoSample/VideoSample";
const number_of_samples = 26

class Sampler extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            samplesToShow: [],
            update: 0
        };
        this.keysDown = {}
        this.keyDown = this.keyDown.bind(this);
        this.keyUp = this.keyUp.bind(this);
        this.removeVideoSample = this.removeVideoSample.bind(this);
        this.samples = [];
        for (let i = 0; i < number_of_samples; i++) {
            this.samples.push({
                start: Math.round(((this.props.videoLength / number_of_samples) * i)),
                end: Math.round(((this.props.videoLength / number_of_samples) * (i + 1))),
                code: 65 + i
            });
        }
        console.log(this.samples, ' : samples');
    }

    keyDown(e) {
        console.log(e, ' : key down');
        if (e.code === 'Escape') {
            this.setState({samplesToShow: []})
            return;
        }
        if (!this.keyDown[e.keyCode]) {
            this.keyDown[e.keyCode] = 1;
        } else {
            this.keyDown[e.keyCode]++;
            return;
        }
        let sample = this.samples.find((s) => s.code === e.keyCode);
        let sampleAlreadyThere = this.state.samplesToShow.find((s) => s.code === e.keyCode);
        if (!sampleAlreadyThere && sample && this.state.samplesToShow.length < 3) {
            console.log('Add it in');
            sample.key = e.key;
            this.state.samplesToShow.push(sample);
            let wh = this.rowColumnNumber(this.state.samplesToShow.length);
            console.log(this.state.samplesToShow, ' : this.state.samplesToShow')
            this.setState({update: this.state.update + 1, w: wh.w, h: wh.h})
        } else if (sampleAlreadyThere && sample) {
            this.removeVideoSample(e.keyCode);
        }
    }

    removeVideoSample(keyCode) {
        let index = this.state.samplesToShow.findIndex(function (o) {
            return o.code === keyCode;
        })
        if (index !== -1) this.state.samplesToShow.splice(index, 1);
        let wh = this.rowColumnNumber(this.state.samplesToShow.length);
        this.setState({update: this.state.update + 1, w: wh.w, h: wh.h})
    }

    keyUp(e) {
        if (e.code === 'Escape') return;
        console.log(this.keyDown[e.keyCode]);
        // let keyPress = this.keyDown[e.keyCode];
        if (!e.shiftKey) {
            this.removeVideoSample(e.keyCode)
        }
        this.keyDown[e.keyCode] = null;
    }

    rowColumnNumber(x) {
        //CODE TO CALCULATE ROW/COLUMN NUMBER
        if (x !== 3) {
            let columns = Math.ceil(Math.sqrt(x));
            let lines = Math.ceil(x / columns);
            return {
                w: (1 / columns) * 100,
                h: (1 / lines) * 100
            };
        } else {
            return {
                w: 33.33,
                h: 100
            }
        }
    }

    componentDidMount() {
        document.addEventListener("keydown", this.keyDown, false);
        document.addEventListener("keyup", this.keyUp, false);
    }

    componentWillUnmount() {
        document.removeEventListener("keydown", this.keyDown, false);
        document.removeEventListener("keyup", this.keyUp, false);
    }

    render() {
        return this.state.samplesToShow.map((s, i) => {
            return (<VideoSample videoSrc={this.props.videoSrc} key={s.code} keyName={s.key} w={this.state.w} h={this.state.h} start={s.start}
                                 end={s.end}/>)
        })
    }
}

export default Sampler;