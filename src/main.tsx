import ReactDOM from 'react-dom/client';
import App from './app/App.tsx';
import { GlobalProvider } from './app/GlobalProvider.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <GlobalProvider>
    <App />
  </GlobalProvider>,
);
