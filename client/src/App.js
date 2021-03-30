import './App.css'
import { PdfUpload } from './components/PdfUpload'
import mrBean from'./assets/mrbean.webp'

const App = () => (
    <div className='app'>
       <h1>Mr.Bean's Pdf Upload Component</h1>
       <img src={mrBean} alt="Mr. Bean!!!!"/>
       <PdfUpload />
    </div>
);

export default App;
