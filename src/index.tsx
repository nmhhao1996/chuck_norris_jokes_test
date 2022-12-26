import ReactDOM from 'react-dom';
import App from './App';
import './App.scss';
import { JokeServiceProvider } from 'services/JokeService';

const el = document.getElementById('root');

ReactDOM.render(
    <JokeServiceProvider>
        <App />
    </JokeServiceProvider>,
    el,
);
