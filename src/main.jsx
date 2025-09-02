import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { Toaster } from 'react-hot-toast'
import { HelmetProvider } from 'react-helmet-async';

import App from './App';


createRoot(document.getElementById('root')).render(
  <>
    <HelmetProvider>
      <App />
      <Toaster />
    </HelmetProvider>,
  </>
)
