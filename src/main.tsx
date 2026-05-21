import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './app/App'
import "swiper/css";
import "swiper/css/navigation";
import { Provider } from 'react-redux';
import { store } from './app/store';
import AuthInitializer from './app/AuthInitializer';
import { Toaster } from 'react-hot-toast';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <AuthInitializer>
        <App />
        <Toaster position="top-right" reverseOrder={false} />
      </AuthInitializer>
    </Provider>
  </StrictMode>,
)
