import ReactDOM from 'react-dom/client';
//
import App from './components/App';
//
import './assets/scss/index.scss';

const dom = document.getElementById('root') as HTMLElement;
const root = ReactDOM.createRoot(dom);
root.render(<App />);
