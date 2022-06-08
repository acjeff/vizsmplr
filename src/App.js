import './App.css';
import PreloadVideo from "./components/PreloadVideo";

function App() {
    console.log("Load App");
    return (
        <div className="App" style={{backgroundColor: 'black'}}>
            <PreloadVideo/>
        </div>
    );
}

export default App;