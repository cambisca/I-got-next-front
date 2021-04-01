import React from 'react'
import { Link } from 'react-router-dom'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

function CourtMap({position, courts }){
    
    return (
        <MapContainer center={[40.70560931641861, -73.99618941997488]} zoom={13} scrollWheelZoom={true} id="map">
            <TileLayer
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {courts.map((court) => {
                return (<Marker position={[court.latitude, court.longitude]}>
                    <Popup>
                        <Link to={`/courts/${court.id}`}> {court.name} </Link>
                    </Popup>
                </Marker>
            )})}
        </MapContainer>
    
    )
}

export default CourtMap;


// center={position}
// position={position}