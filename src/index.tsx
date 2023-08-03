import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import store from './store/config';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
    <Provider store={store}>
      <App />
    </Provider>
);

reportWebVitals();
