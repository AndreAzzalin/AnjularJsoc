import {Component, OnInit} from '@angular/core';


declare let L;

@Component({
    selector: 'app-map',
    templateUrl: './map.component.html',
    styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
    op_name = 'mission book';
    op_text = 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.';

    constructor() {

    }

    ngOnInit() {
        let map;
        const mapbox_token = 'pk.eyJ1IjoiYWRyaWFubzEiLCJhIjoiY2loZjNldXQxMDA1eXUybTRjcHg1NmpvdSJ9._XP1KOZt9b6lerXf8tG6pw';


        map = L.map('mapDiv').setView([44.988, 7.42], 15);
        const osm = L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png');

        this.addGrid(map);

        // selezione multi tiles
        const tf = L.tileLayer('https://tile.thunderforest.com/outdoors/{z}/{x}/{y}.png?apikey=9e8117bb902147d6863cf0c1af2b32bd');
        const mapboxSat = L.tileLayer('https://api.mapbox.com/v4/adriano1.o8n8cj41/{z}/{x}/{y}.png?access_token=' + mapbox_token);
        const mapboxTerrain = L.tileLayer('https://api.mapbox.com/v4/adriano1.o8n9d1ca/{z}/{x}/{y}.png?access_token=' + mapbox_token);
        map.addLayer(tf);
        //prova

        const drawnItems = L.featureGroup().addTo(map);
        map.addControl(new L.Control.Layers({
            'TF Outdoors': tf,
            'OpenStreetMap': osm,
            'Mapbox Sat': mapboxSat,
            'Mapbox Terrain': mapboxTerrain
        }, {'drawlayer': drawnItems}, {position: 'topleft'}));


        map.addControl(new L.Control.Draw({
            draw: {
                polygon: true,
                polyline: true,
                rectangle: true,
                circle: true
            }
        }));


        map.on(L.Draw.Event.CREATED, function (event) {
            const layer = event.layer;
            drawnItems.addLayer(layer);
        });

        L.control.sidebar({container: 'sidebar', position: 'right'})
            .addTo(map)
        ;


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

}
