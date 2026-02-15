import { useState } from 'react';
import { PropertiesMapView } from './components/PropertiesMapView/PropertiesMapView';
import { PropertiesGridView } from './components/PropertiesGridView/PropertiesGridView';
import './App.css';

function App() {
    const [view, setView] = useState<'map' | 'grid'>('map');

    return (
        <div className="app-container">
            <header className="app-header">
                <h1>GeoSpacial Properties</h1>
                <div className="view-toggle">
                    <button
                        className={`toggle-btn ${view === 'map' ? 'active' : ''}`}
                        onClick={() => setView('map')}
                    >
                        Map View
                    </button>
                    <button
                        className={`toggle-btn ${view === 'grid' ? 'active' : ''}`}
                        onClick={() => setView('grid')}
                    >
                        Grid View
                    </button>
                </div>
            </header>
            <main className="app-content">
                {view === 'map' ? <PropertiesMapView /> : <PropertiesGridView />}
            </main>
        </div>
    );
}

export default App;
