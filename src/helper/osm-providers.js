export default {
    maptiler: {
        url:
            "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
        attribution:""
    },

    googleSat :{
        url:'https://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}',
        maxZoom : 20,
        attribution: '',
        subdomains:['mt1','mt2','mt3'],
    }
};