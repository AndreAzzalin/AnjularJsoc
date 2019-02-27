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
          'name': 'HQ'
        },
        'geometry': {
          'type': 'Point',
          'coordinates': [
            9.01231818851834,
            44.575719084161044
          ]
        }
      },
      {
        'type': 'Feature',
        'properties': {
          'id': 1,
          //'name': 'OBJ_1'
          'name': 'Tana del lupo'
        },
        'geometry': {
          'type': 'Point',
          'coordinates': [
            9.004433696257546,
            44.577772254513214
          ]
        }
      },
      {
        'type': 'Feature',
        'properties': {
          'id': 2,
        // 'name': 'OBJ_2',
          'name': 'Dr. Ludvig ',
        },
        'geometry': {
          'type': 'Point',
          'coordinates': [
            8.994193114032251,
            44.58033793208094
          ]
        }
      },
      {
        'type': 'Feature',
        'properties': {
          'id': 3,
          //'name': 'OBJ_3',
          'name': 'Comunicazioni',
        },
        'geometry': {
          'type': 'Point',
          'coordinates': [
            8.991685942033715,
            44.58392980992787
          ]
        }
      },
      {
        'type': 'Feature',
        'properties': {
          'id': 4,
        //  'name': 'OBJ_4',
          'name': 'Macchina del tempo',
        },
        'geometry': {
          'type': 'Point',
          'coordinates': [
            9.017304783755687,
            44.57188332914383
          ]
        }
      },
      {
        'type': 'Feature',
        'properties': {
          'id': 5,
        //  'name': 'OBJ_5',
          'name': 'Ospedale da campo',
        },
        'geometry': {
          'type': 'Point',
          'coordinates': [
            8.992329170894548,
            44.57800615045223
          ]
        }
      },
      {
        'type': 'Feature',
        'properties': {
          'id': 6,
          //'name': 'OBJ_6',
          'name': 'Testa di ponte',
        },
        'geometry': {
          'type': 'Point',
          'coordinates': [
            9.002657893010348,
            44.582039538293834

          ]
        }
      }, {
        'type': 'Feature',
        'properties': {
          'id': 7,
          'name': 'WP_1',
        },
        'geometry': {
          'type': 'Point',
          'coordinates': [
            9,
            44.58094125329124

          ]
        }
      }, {
        'type': 'Feature',
        'properties': {
          'id': 8,
          'name': 'WP_2',
        },
        'geometry': {
          'type': 'Point',
          'coordinates': [
            9.014105828808301,
            44.57203681330511

          ]
        }
      },
      {
        'type': 'Feature',
        'properties': {
          'id': 9,
          'name': 'WP_3',
        },
        'geometry': {
          'type': 'Point',
          'coordinates': [
            8.99203961784107,
            44.57690781393056

          ]
        }
      }, {
        'type': 'Feature',
        'properties': {
          'id': 10,
          'name': 'WP_4',
        },
        'geometry': {
          'type': 'Point',
          'coordinates': [
            9.010503631358713,
            44.57107392261764

          ]
        }
      }, {
        'type': 'Feature',
        'properties': {
          'id': 11,
          'name': 'WP_5',
        },
        'geometry': {
          'type': 'Point',
          'coordinates': [
            9.00746859026383,
            44.57248757038551

          ]
        }
      }, {
        'type': 'Feature',
        'properties': {
          'id': 12,
          'name': 'WP_6',
        },
        'geometry': {
          'type': 'Point',
          'coordinates': [
            9.007003406300512,
            44.57928456168757

          ]
        }
      }, {
        'type': 'Feature',
        'properties': {
          'id': 13,
          'name': 'WP_7',
        },
        'geometry': {
          'type': 'Point',
          'coordinates': [
            8.996951991367823,
            44.57475642961811

          ]
        }
      }


    ]
  };

//carico geoJson e li aggiungo all mappa
  loadGeoJson () {
    var custom_icon = L.icon({
      iconUrl: '../assets/Icons/crosshairs-solid.svg',
      iconSize: [40, 40],
      opacity: '0.5'
    });

    function onEachFeature (feature, layer) {
      layer.bindTooltip(feature.properties.name, {permanent: true, direction: 'bottom', offset: [0, 10]});
    }

    this.geoJsonLayer = L.geoJSON(this.geoJsonTest, {
      pointToLayer: function (feature, latlng) {
        return L.marker(latlng, {icon: custom_icon});
      },
      onEachFeature: onEachFeature
    }).addTo(this.map);
  }


  getWaypointList () {
    return this.geoJsonTest;
  }

  centerToLatLng (lat, lng, zoom) {


    this.map.flyTo([lat, lng], zoom);
  }


  /*qua le cordinate le inserisco in utm */
  centerToUTM (nord, est, zoom) {
    const coordUTM = L.utm({x: nord, y: est, zone: 32, band: 'T'});
    const coordLatLng = coordUTM.latLng();

    console.log(coordLatLng.lat);
    console.log(coordLatLng.lng);
    console.log(coordLatLng);

    this.map.flyTo(coordLatLng, zoom);
  }


  getCenter () {
    return this.map.getCenter().utm().toString({decimals: 0, format: '{zone} {band} {x} {y}  '});
  }


  initializeMap () {
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

  addGrid (map) {
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
    // map.addLayer(grid);
  }

  addWaypoint (nord, est, iconPath, label) {
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

  latLongToUtm (lat, lng, l) {
    const con = L.latLng(lat, lng);
    const utm = con.utm().toString({decimals: 0, format: '{zone}T {x} - {y}'});
    return utm;

  }

  removeWaypoint (f: number) {
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
