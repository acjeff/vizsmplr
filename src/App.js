import './App.css';
import Sampler from "./components/Sampler";
const audio_url = 'https://firebasestorage.googleapis.com/v0/b/vizsmplr.appspot.com/o/Kendrick-Lamar-N95.mp3?alt=media&token=8e9e1095-80bb-4cf6-8925-6c497a7c1f36';

function App() {

    return (
        <div className="App" style={{backgroundColor: 'black'}}>
            <Sampler/>
            <audio style={{width: '100%', position: 'fixed', bottom: 0}} src={audio_url} autoPlay controls/>
        </div>
    );
}

export default App;