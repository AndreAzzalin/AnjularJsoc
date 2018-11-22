import {Component, OnInit} from '@angular/core';
import {ɵh23} from "@angular/material";


declare let L;

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
  op_name = 'Fazione 3: Unione Forze Speciali Tutela Globale (UFSTG)';
  op_text = '';
  map;

  constructor() {

  }

  ngOnInit() {

    const mapbox_token = 'pk.eyJ1IjoiYWRyaWFubzEiLCJhIjoiY2loZjNldXQxMDA1eXUybTRjcHg1NmpvdSJ9._XP1KOZt9b6lerXf8tG6pw';

    //44.856266, 7.358346
    //44.988, 7.42
    this.map = L.map('mapDiv').setView([44.856266, 7.358346], 17);
    const osm = L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png');

    this.addGrid(this.map);

    // selezione multi tiles
    const tf = L.tileLayer('https://tile.thunderforest.com/outdoors/{z}/{x}/{y}.png?apikey=9e8117bb902147d6863cf0c1af2b32bd');
    const mapboxSat = L.tileLayer('https://api.mapbox.com/v4/adriano1.o8n8cj41/{z}/{x}/{y}.png?access_token=' + mapbox_token);
    const mapboxTerrain = L.tileLayer('https://api.mapbox.com/v4/adriano1.o8n9d1ca/{z}/{x}/{y}.png?access_token=' + mapbox_token);
    this.map.addLayer(tf);
    //prova

    const drawnItems = L.featureGroup().addTo(this.map);
    this.map.addControl(new L.Control.Layers({
      'TF Outdoors': tf,
      'OpenStreetMap': osm,
      'Mapbox Sat': mapboxSat,
      'Mapbox Terrain': mapboxTerrain
    }, {'drawlayer': drawnItems}, {position: 'topleft'}));


    this.map.addControl(new L.Control.Draw({
      draw: {
        polygon: true,
        polyline: true,
        rectangle: true,
        circle: true,
        marker:false
      }
    }));


    this.map.on(L.Draw.Event.CREATED, function (event) {
      const layer = event.layer;
      drawnItems.addLayer(layer);
    });

    L.control.sidebar({container: 'sidebar', position: 'right'})
      .addTo(this.map)
    ;




   this.addCustomIcon(44.856337,7.35798513581253,"/assets/Icons/start.png");
   this.addCustomIcon(44.855354,7.357810602843642,"/assets/Icons/radio.png");
   this.addCustomIcon(44.856861,7.359311839848585,"/assets/Icons/cratere.png");
   this.addCustomIcon(44.857307,7.357830995918195,"/assets/Icons/americano.png");
   this.addCustomIcon(44.857354,7.356677935097191,"/assets/Icons/urp.png");
   this.addCustomIcon(44.858479,7.355405568261065,"/assets/Icons/ponte.png");
   this.addCustomIcon(44.856935,7.361799,"/assets/Icons/macchine.png");



  }

  addCustomIcon(lat,long,iconPath){
    var custom_icon = L.icon({
      iconUrl: iconPath,
      iconSize: [80, 45],
      /*  iconAnchor: [22, 94],
        popupAnchor: [-3, -76],
        shadowSize: [68, 95],
        shadowAnchor: [22, 94]*/
      opacity: '0.5'
    });

    L.marker([lat, long], {draggable: true, icon: custom_icon}).addTo(this.map);

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

  centerTo(lat, lon, zoom) {
    this.map.flyTo([lat, lon], zoom);
  }

  getCenter() {
    return this.map.getCenter()
  }
}
