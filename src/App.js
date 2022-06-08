import './App.css';
import Sampler from "./components/Sampler";
import AudioPlayer from "./components/AudioPlayer";
const video_url = 'https://firebasestorage.googleapis.com/v0/b/vizsmplr.appspot.com/o/kendricklamarn.mp4?alt=media&token=ccf53a44-5a78-49ca-9c56-6de335e09fbd';

function App() {

    return (
        <div className="App" style={{backgroundColor: 'black'}}>
            <video preload={'auto'} style={{display: 'none'}} loop muted>
                <source src={video_url} type="video/mp4"/>
            </video>
            <Sampler/>
            <AudioPlayer/>
        </div>
    );
}

export default App;