import React from 'react'
import ReactDOM from 'react-dom/client'
import { ReactQueryProvider, ApiClient } from '@maat/api-hooks'
import App from './App.tsx'
import './index.css'

const queryClient = new ApiClient();

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <ReactQueryProvider client={queryClient}>
            <App />
        </ReactQueryProvider>
    </React.StrictMode>,
)
