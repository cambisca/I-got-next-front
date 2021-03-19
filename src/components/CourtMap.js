import React from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

function CourtMap({position, courts }){
    
    return (
        <main>
          <MapContainer center={[40.70560931641861, -73.99618941997488]} zoom={13} scrollWheelZoom={true}>
            <TileLayer
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {courts.map((court) => {
                return (<Marker position={[court.latitude, court.longitude]}>
                    <Popup>
                        {court.name}
                    </Popup>
                </Marker>
            )})}
        </MapContainer>
        </main>
    )
}

export default CourtMap;


// center={position}
// position={position}