import React from 'react';
import VideoSample from "./VideoSample/VideoSample";

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
            },
            {
                start: 40,
                end: 45
            },
            {
                start: 50,
                end: 55
            },
            {
                start: 60,
                end: 65
            },
            {
                start: 70,
                end: 75
            },
            {
                start: 80,
                end: 85
            },
            {
                start: 90,
                end: 95
            },
            {
                start: 100,
                end: 105
            },
            {
                start: 110,
                end: 115
            },
            {
                start: 120,
                end: 125
            },
            {
                start: 130,
                end: 135
            },
            {
                start: 140,
                end: 145
            },
            {
                start: 150,
                end: 155
            },
            {
                start: 160,
                end: 165
            },
            {
                start: 170,
                end: 175
            },
            {
                start: 180,
                end: 185
            },
            {
                start: 190,
                end: 195
            },
            {
                start: 145,
                end: 150
            },
            {
                start: 135,
                end: 140
            },
            {
                start: 190,
                end: 200
            },
            {
                start: 25,
                end: 30
            },
            {
                start: 75,
                end: 80
            },
            {
                start: 195,
                end: 200
            }
        ]
        this.samples = this.samples.map((s, i) => {
            s.code = 65 + i;
            return s;
        });
        console.log(this.samples, ' : samples');
    }

    keyDown(e) {
        console.log(e, ' : key down');
        if (!this.keyDown[e.keyCode]) {
            this.keyDown[e.keyCode] = 1;
        } else {
            this.keyDown[e.keyCode]++;
            return;
        }
        let sample = this.samples.find((s) => s.code === e.keyCode);
        let sampleAlreadyThere = this.state.samplesToShow.find((s) => s.code === e.keyCode);
        if (!sampleAlreadyThere && sample) {
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
        // console.log(e, ' : key up');
        // let keyCode = e.keyCode;
        console.log(this.keyDown[e.keyCode]);
        let keyPress = this.keyDown[e.keyCode];
        if (keyPress > 1) {
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
        return this.state.samplesToShow.sort((a, b) => a.code - b.code).map((s, i) => {
            return (<VideoSample key={s.code} keyName={s.key} w={this.state.w} h={this.state.h} start={s.start}
                                 end={s.end}/>)
        })
    }
}

export default Sampler;