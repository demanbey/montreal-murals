import React, {useState, useEffect} from 'react';
import ReactMapGL, {Marker, Popup} from 'react-map-gl';

import muralData from './data/murales.json';
import {ReactComponent as Pin} from './assets/pin.svg';

import './App.css';

const TOKEN = 'pk.eyJ1IjoiaGRlbWFuYmV5IiwiYSI6ImNqdjg5bmJuNjBvZnozeW81c2Z1a2tnaTcifQ.VGfAG6v33hRLl0ZxEydjMw'

function App() {
  const [viewport, setViewport] = useState({
    latitude: 45.5017,
    longitude: -73.5673,
    zoom: 11,
    width: '100vw',
    height: '100vh'
  });
  const [selectedMural, setSelectedMural] = useState(null);

  useEffect(() => {
    const listener = e => {
      if (e.key === "Escape") {
        setSelectedMural(null)
      }
    };
    window.addEventListener("keydown", listener);
  
      return () => {
        window.removeEventListener("keydown", listener);
      }
  }, []);

  return (
    <div>
      <ReactMapGL 
        {...viewport} 
        mapboxApiAccessToken={TOKEN}
        mapStyle='mapbox://styles/hdemanbey/cjzfq6zod1fxq1dox8qh5klkl'
        onViewportChange={viewport => {
          setViewport(viewport);
        }}
      >
        {muralData.features.map((mural) => (
          <Marker 
            key={mural.properties.id}
            latitude={mural.geometry.coordinates[1]}
            longitude={mural.geometry.coordinates[0]}
            >
              <button className='marker-btn' onClick={(e => {
                e.preventDefault();
                setSelectedMural(mural)
              })}>
                <Pin className='marker-pin'/>
              </button>
          </Marker>
        ))}

        {selectedMural ? (
          <Popup 
            latitude={selectedMural.geometry.coordinates[1]} 
            longitude={selectedMural.geometry.coordinates[0]}
            onClose={() => {
              setSelectedMural(null);
            }}
          >
            <div>
              <h3>Artist: {selectedMural.properties.artiste}</h3>
              <h3>Organization: {selectedMural.properties.organisation}</h3>
              <h3>Address: {selectedMural.properties.adresse}</h3>
              <div>
                <img className='popup-photo' src={selectedMural.properties.image} alt='mural'/>
              </div>
            </div>
          </Popup>
        ) : null}
      </ReactMapGL>
    </div>
  );
}

export default App;
