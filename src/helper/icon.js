import L from 'leaflet';

const iconCar = new L.Icon({
    iconUrl: '/placeholder.png',
    iconRetinaUrl: '/placeholder.png',
    iconAnchor: null,
    popupAnchor: [0, 0],
    shadowUrl: null,
    shadowSize: null,
    shadowAnchor: [40,40],
    iconSize: new L.Point(40, 40),
    className: 'leaflet-div-icon bg-icon'
});

export { iconCar };