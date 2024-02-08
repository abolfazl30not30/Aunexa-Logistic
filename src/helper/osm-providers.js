export default {
    maptiler: {
        url:
            "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
        attribution:
            '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    },

    googleSat :{
        url:'https://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}',
        maxZoom : 20,
        attribution: '',
        subdomains:['mt1','mt2','mt3'],
    }
};