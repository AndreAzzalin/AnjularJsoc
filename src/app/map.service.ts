import {Injectable} from '@angular/core';
import {forEach} from '@angular/router/src/utils/collection';

declare let L;

@Injectable({
    providedIn: 'root'
})
export class MapService {
    private map;
    private geoJsonLayer;

    private geoJsonTest = {
        'type': 'FeatureCollection',
        'features': [
            {
                'type': 'Feature',
                'properties': {
                    'id': 0,
                    'name': ' wp 1'
                },
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
                    'id': 1,
                    'name': ' wp 2'
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
                    'id': 2,
                    'name': ' wp 3',
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

//carico geoJson e li aggiungo all mappa
    loadGeoJson() {
        var custom_icon = L.icon({
            iconUrl: '../assets/Icons/point.png',
            iconSize: [40, 40],
            opacity: '0.5'
        });

        function onEachFeature(feature, layer) {
            layer.bindTooltip(feature.properties.name, {permanent: true, direction: 'bottom', offset: [0, 10]});
        }

        this.geoJsonLayer = L.geoJSON(this.geoJsonTest, {
            pointToLayer: function (feature, latlng) {
                return L.marker(latlng, {icon: custom_icon});
            },
            onEachFeature: onEachFeature
        }).addTo(this.map);
    }


    getWaypointList() {
        return this.geoJsonTest;
    }

    centerToLatLng(lat, lng, zoom) {


        this.map.flyTo([lat,lng], zoom);
    }


    /*qua le cordinate le inserisco in utm */
    centerToUTM(nord, est, zoom) {
        const coordUTM = L.utm({x: nord, y: est, zone: 32, band: 'T'});
        const coordLatLng = coordUTM.latLng();

        console.log(coordLatLng.lat);
        console.log(coordLatLng.lng);
        console.log(coordLatLng);

        this.map.flyTo(coordLatLng, zoom);
    }


    getCenter() {
        return this.map.getCenter().utm().toString({decimals: 0, format: '{zone} {band} {x} {y}  '});
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
        }, {'drawlayer': drawnItems}, {position: 'topright'}));

        const optionDraw = {
            position: 'topright',
            draw: {
                polygon: true,
                polyline: true,
                rectangle: true,
                circle: true,
                marker: false
            },
            edit: {
                featureGroup: drawnItems,
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

    addWaypoint(nord, est, iconPath, label) {
        const coordUTM = L.utm({x: nord, y: est, zone: 32, band: 'T'});
        const coordLatLng = coordUTM.latLng();

        console.log(coordLatLng.lat);
        console.log(coordLatLng.lng);
        console.log(coordLatLng);


        this.map.removeLayer(this.geoJsonLayer);

        var custom_icon = L.icon({
            iconUrl: iconPath,
            iconSize: [20, 20],
            opacity: '0.5'
        });

        this.geoJsonTest.features.push({
            'type': 'Feature',
            'properties': {
                'id': 3,
                'name': '' + label + ''
            },
            'geometry': {
                'type': 'Point',
                'coordinates': [
                    coordLatLng.lng,
                    coordLatLng.lat
                ]
            }
        });

        this.loadGeoJson();
    }

    removeWaypoint(f: number) {
        this.map.removeLayer(this.geoJsonLayer);
        let i = 0;
        this.geoJsonTest.features.forEach(x => {
            if (x.properties.id === f) {
                console.log(f + ' ' + x.properties.id + 'true');
                this.geoJsonTest.features.splice(i, 1);
            }
            i++;
        });
    }


}
