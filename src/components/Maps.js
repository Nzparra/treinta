import React from "react";
import {
    GoogleMap,
    useLoadScript,
    Marker,
    InfoWindow,
} from "@react-google-maps/api";
import maStyles from "./mapStyles";


const libraries = ["places"];
const mapContainerStyle = {
    width: '100vw',
    height: '100vh'
};
const center = {
    lat: 4.724567,
    lng: -74.115488,
};
const options = {
    styles: maStyles,
    disableDefaultUI: true,
    zoomControl: true,
};

const Maps = (props) => {
    const {handleLogout,
        stores} = props;
    const {isLoaded, loadError} = useLoadScript({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
        libraries,
    });
const [markers, setMarkers] = React.useState([]);
const [selected, setSelected] = React.useState(null);

const onMapClick = React.useCallback((e) => {
    setMarkers((current) => [
        ...current, 
        {
            lat: e.latLng.lat(),
            lng: e.latLng.lng(),
            time: new Date(),
        },
    ]);
}, []);

    const mapRef = React.useRef();
    const onMapLoad = React.useCallback((map) => {
        mapRef.current = map;
    }, []);
    if (loadError) return "Error loading maps";
    if (!isLoaded) return "Loading Maps";
    return (
        
        <section className="hero">
            <nav>
                <h2>treinta</h2>
                <button onClick={handleLogout}>Logout</button>
            </nav>
            <div>
                <GoogleMap 
                    mapContainerStyle={mapContainerStyle}
                    zoom={16}
                    center={center}
                    options={options}
                    onClick={onMapClick}
                    onLoad={onMapLoad}
                >
                    {stores.map((marker) => (
                        <Marker
                            key={marker.id}
                            position={{lat: marker.lat, lng: marker.lng}}
                            onClick={() => {
                                setSelected(marker);
                            }}
                        />
                    ))}
                    {selected  ? (
                    <InfoWindow position={{lat: selected.lat, lng: selected.lng }} onCloseClick={() => {setSelected(null);}}>
                        <div>
                            <h2>{selected.Nombre}</h2>
                            <p>Direccion: {selected.dir}</p>
                        </div>
                    </InfoWindow>) : null}
                </GoogleMap>
            </div>
        </section>
    );
};

export default Maps;