import {Injectable} from '@angular/core';

declare let L;

@Injectable({
    providedIn: 'root'
})
export class MapService {
    private map;


    private geoJsonTest = {
        'type': 'FeatureCollection',
        'features': [
            {
                'type': 'Feature',
                'properties': {'name': ' porcodio 1'},
                'geometry': {
                    'type': 'Point',
                    'coordinates': [
                        7.358157634735107,
                        44.85518430893129
                    ]
                }
            },
            {
                'type': 'Feature',
                'properties': {
                    'name': ' porcodio 2'
                },
                'geometry': {
                    'type': 'Point',
                    'coordinates': [
                        7.3568809032440186,
                        44.85646203274499
                    ]
                }
            },
            {
                'type': 'Feature',
                'properties': {
                    'name': ' porcodio 3',
                    'marker-color': '#0000ff'
                },
                'geometry': {
                    'type': 'Point',
                    'coordinates': [
                        7.355700731277466,
                        44.85753438620626
                    ]
                }
            }
        ]
    };


    testGeoJson() {

        var custom_icon = L.icon({
            iconUrl: '../assets/Icons/point.png',
            iconSize: [40, 40],
            opacity: '0.5'
        });

        //label
        function onEachFeature(feature, layer) {
            layer.bindTooltip(feature.properties.name, {permanent: false, direction: 'bottom', offset: [0, 0]});
        }

        //leggo JSON aggiungo simbolo alla mappa
        L.geoJSON(this.geoJsonTest, {
            pointToLayer: function (feature, latlng) {
                return L.marker(latlng, {icon: custom_icon});
            },
            onEachFeature: onEachFeature
        }).addTo(this.map);
    }


    getWaypointList() {
        return this.geoJsonTest;
    }


    centerTo(lat, lon, zoom) {
        this.map.flyTo([lat, lon], zoom);
    }


    getCenter() {
        return this.map.getCenter();
    }


    initializeMap() {
        const mapbox_token = 'pk.eyJ1IjoiYWRyaWFubzEiLCJhIjoiY2loZjNldXQxMDA1eXUybTRjcHg1NmpvdSJ9._XP1KOZt9b6lerXf8tG6pw';
        const osm = L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png');
        const tf = L.tileLayer('https://tile.thunderforest.com/outdoors/{z}/{x}/{y}.png?apikey=9e8117bb902147d6863cf0c1af2b32bd');
        const mapboxSat = L.tileLayer('https://api.mapbox.com/v4/adriano1.o8n8cj41/{z}/{x}/{y}.png?access_token=' + mapbox_token);
        const mapboxTerrain = L.tileLayer('https://api.mapbox.com/v4/adriano1.o8n9d1ca/{z}/{x}/{y}.png?access_token=' + mapbox_token);

        this.map = L.map('mapDiv').setView([44.857534, 7.355711], 17);

        this.map.addLayer(tf);

        const drawnItems = L.featureGroup().addTo(this.map);
        this.map.addControl(new L.Control.Layers({
            'TF Outdoors': tf,
            'OpenStreetMap': osm,
            'Mapbox Sat': mapboxSat,
            'Mapbox Terrain': mapboxTerrain
        }, {'drawlayer': drawnItems}, {position: 'topleft'}));

        const optionDraw = {
            draw: {
                polygon: true,
                polyline: true,
                rectangle: true,
                circle: true,
                marker: false
            },
            edit: {
                featureGroup: drawnItems
            }
        };
        const drawControl = new L.Control.Draw(optionDraw);
        this.map.addControl(drawControl);

        this.map.on(L.Draw.Event.CREATED, function (event) {
            const layer = event.layer;
            drawnItems.addLayer(layer);


        });
        this.addGrid(this.map);


    }

    addGrid(map) {
        L.Utm32TGrid = L.MetricGrid.extend({
            options: {
                proj4ProjDef: '+proj=utm +zone=32 +ellps=WGS84 +datum=WGS84 +units=m +no_defs',
                bounds: [[0, 0], [1000000, 10000000]]
            }
        });
        L.utm32TGrid = function (options) {
            return new L.Utm32TGrid(options);
        };
        const grid = L.utm32TGrid({
            color: '#333',
            showAxisLabels: [100, 1000],
            showAxis100km: true
        });
        map.addLayer(grid);
    }

    addWaypoint(lat, long, iconPath, label) {
        var custom_icon = L.icon({
            iconUrl: iconPath,
            iconSize: [20, 20],
            opacity: '0.5'
        });

        var marker = L.marker([lat, long], {draggable: false, icon: custom_icon});
        marker.bindTooltip(label, {permanent: true, direction: 'bottom', offset: [0, 0]});
        marker.addTo(this.map);

        this.geoJsonTest.features.push({
            'type': 'Feature',
            'properties': {
                'name': '' + label + ''
            },
            'geometry': {
                'type': 'Point',
                'coordinates': [
                    7.355700731277466,
                    44.85753438620626
                ]
            }
        });
    }


}
