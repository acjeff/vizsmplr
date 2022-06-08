import './App.css';
import Sampler from "./components/Sampler";
import AudioPlayer from "./components/AudioPlayer";

function App() {

    return (
        <div className="App" style={{backgroundColor: 'black'}}>
            <Sampler/>
            <AudioPlayer/>
        </div>
    );
}

export default App;