import {Component, OnInit} from '@angular/core';



declare let L;

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

  constructor() {
  }

  ngOnInit() {
    let map;
    let mapbox_token = 'pk.eyJ1IjoiYWRyaWFubzEiLCJhIjoiY2loZjNldXQxMDA1eXUybTRjcHg1NmpvdSJ9._XP1KOZt9b6lerXf8tG6pw';
    this.initializeGrid();


    map = L.map('mapDiv').setView([44.988, 7.42], 15);
    let osm = L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png');

    let grid = L.utm32TGrid({
      color: '#333',
      showAxisLabels: [100, 1000],
      showAxis100km: true
    });

    map.addLayer(grid);

    // selezione multi tiles
    let tf = L.tileLayer('https://tile.thunderforest.com/outdoors/{z}/{x}/{y}.png?apikey=9e8117bb902147d6863cf0c1af2b32bd');
    let mapboxSat = L.tileLayer('https://api.mapbox.com/v4/adriano1.o8n8cj41/{z}/{x}/{y}.png?access_token=' + mapbox_token);
    let mapboxTerrain = L.tileLayer('https://api.mapbox.com/v4/adriano1.o8n9d1ca/{z}/{x}/{y}.png?access_token=' + mapbox_token);
    map.addLayer(tf);

    let drawnItems = L.featureGroup().addTo(map);
    map.addControl(new L.Control.Layers({
      "TF Outdoors": tf,
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
      let layer = event.layer;
      drawnItems.addLayer(layer);
    });


  }

  initializeGrid() {
    L.Utm32TGrid = L.MetricGrid.extend({
      options: {
        proj4ProjDef: "+proj=utm +zone=32 +ellps=WGS84 +datum=WGS84 +units=m +no_defs",
        bounds: [[0, 0], [1000000, 10000000]]
      }
    });

    L.utm32TGrid = function (options) {
      return new L.Utm32TGrid(options);
    };
  }

}
