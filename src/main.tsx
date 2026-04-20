import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './styles/theme.css';
import './index.css'; // Changed from './styles.css' to './index.css'

const rootElement = document.getElementById('root');
if (!rootElement) throw new Error('Root element not found');
const root = createRoot(rootElement);

root.render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);
