import React from 'react';
import VideoSample from "./VideoSample/VideoSample";

class Sampler extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            samplesToShow: [],
            update: 0
        };
        this.keyDown = this.keyDown.bind(this);
        this.keyUp = this.keyUp.bind(this);

        this.samples = [
            {
                start: 15,
                end: 25
            },
            {
                start: 25.5,
                end: 30
            },
            {
                start: 31,
                end: 35
            },
            {
                start: 36,
                end: 37.9
            }
        ]
        this.samples = this.samples.map((s, i) => {
            s.code = 65 + i;
            return s;
        });
        console.log(this.samples, ' : samples');
    }

    keyDown(e) {
        // console.log(e, ' : key down');
        let sample = this.samples.find((s) => s.code === e.keyCode);
        let sampleAlreadyThere = this.state.samplesToShow.find((s) => s.code === e.keyCode);
        if (!sampleAlreadyThere && sample) {
            console.log('Add it in');
            this.state.samplesToShow.push(sample);
            let wh = this.rowColumnNumber(this.state.samplesToShow.length);
            console.log(this.state.samplesToShow, ' : this.state.samplesToShow')
            this.setState({update: this.state.update + 1, w: wh.w, h: wh.h})
        }
    }

    keyUp(e) {
        // console.log(e, ' : key up');
        let keyCode = e.keyCode;
        let index = this.state.samplesToShow.findIndex(function(o){
            return o.code === keyCode;
        })
        if (index !== -1) this.state.samplesToShow.splice(index, 1);
        let wh = this.rowColumnNumber(this.state.samplesToShow.length);
        this.setState({update: this.state.update + 1, w: wh.w, h: wh.h})
    }

    rowColumnNumber(x) {
        //CODE TO CALCULATE ROW/COLUMN NUMBER
        let columns = Math.ceil(Math.sqrt(x));
        let lines = Math.ceil(x / columns);
        return {
            w: (1 / columns) * 100,
            h: (1 / lines) * 100
        };
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
            return (<VideoSample key={s.code} w={this.state.w} h={this.state.h} start={s.start} end={s.end}/>)
        })
    }
}

export default Sampler;