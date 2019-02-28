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
          'name': 'HQ',
          'type': 'HQ'
        },
        'geometry': {
          'type': 'Point',
          'coordinates': [
            9.004798981994636,
            44.57788927348875
          ]
        }
      },
      {
        'type': 'Feature',
        'properties': {
          'id': 1,
          //'name': 'OBJ_1'
          'name': 'Tana del lupo',
          'type': 'OBJ'
        },
        'geometry': {
          'type': 'Point',
          'coordinates': [
            8.992051240750655,
            44.58404686954846
          ]
        }
      },
      {
        'type': 'Feature',
        'properties': {
          'id': 2,
          // 'name': 'OBJ_2',
          'name': 'Dr. Ludvig ',

          'type': 'OBJ'
        },
        'geometry': {
          'type': 'Point',
          'coordinates': [
            9.01767005842491,
            44.572000307077076
          ]
        }
      },
      {
        'type': 'Feature',
        'properties': {
          'id': 3,
          //'name': 'OBJ_3',
          'name': 'Comunicazioni',
          'type': 'OBJ'
        },
        'geometry': {
          'type': 'Point',
          'coordinates': [
            9.011021256817028,
            44.57774480102431
          ]
        }
      },
      {
        'type': 'Feature',
        'properties': {
          'id': 4,
          //  'name': 'OBJ_4',
          'name': 'Macchina del tempo',
          'type': 'OBJ'
        },
        'geometry': {
          'type': 'Point',
          'coordinates': [
            9.000365296686386,
            44.581058286381726
          ]
        }
      },
      {
        'type': 'Feature',
        'properties': {
          'id': 5,
          //  'name': 'OBJ_5',
          'name': 'Ospedale da campo', 'type': 'OBJ'
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
          'name': 'Testa di ponte', 'type': 'OBJ'
        },
        'geometry': {
          'type': 'Point',
          'coordinates': [
            9.014471098028565,
            44.57215380146668

          ]
        }
      }, {
        'type': 'Feature',
        'properties': {
          'id': 7,
          'name': 'WP_1', 'type': 'WP'
        },
        'geometry': {
          'type': 'Point',
          'coordinates': [
            8.992404873303661,
            44.57702487256149

          ]
        }
      }, {
        'type': 'Feature',
        'properties': {
          'id': 8,
          'name': 'WP_2', 'type': 'WP'
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
          'name': 'WP_3', 'type': 'WP'
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
          'name': 'WP_4', 'type': 'WP'
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
          'name': 'WP_5', 'type': 'WP'
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
          'name': 'WP_6', 'type': 'WP'
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
          'name': 'WP_7', 'type': 'WP'
        },
        'geometry': {
          'type': 'Point',
          'coordinates': [
            8.996951991367823,
            44.57475642961811
          ]
        }
      }, {
        'type': 'Feature',
        'properties': {
          'id': 14,
          'name': 'Pericolo',
          'type': 'BAN'
        },
        'geometry': {
          'type': 'Point',
          'coordinates': [
            8.996951991367823,
            44.58475642961811
          ]
        }
      }
    ]
  };

//carico geoJson e li aggiungo all mappa
  loadGeoJson () {
    var icon_OBJ = L.icon({
      iconUrl: '../assets/Icons/crosshairs-solid.svg',
      iconSize: [40, 40],
      opacity: '0.5'
    });

    var icon_WP = L.icon({
      iconUrl: '../assets/Icons/flag.svg',
      iconSize: [40, 40],
      opacity: '0.5'
    });
    var icon_HQ = L.icon({
      iconUrl: '../assets/Icons/home-solid.svg',
      iconSize: [40, 40],
      opacity: '0.5'
    });

    var icon_BAN = L.icon({
      iconUrl: '../assets/Icons/ban-solid.svg',
      iconSize: [40, 40],
      opacity: '0.5'
    });

    function onEachFeature (feature, layer) {
      layer.bindTooltip(feature.properties.name, {permanent: true, direction: 'bottom', offset: [0, 10]});
    }

    this.geoJsonLayer = L.geoJSON(this.geoJsonTest, {
      pointToLayer: function (feature, latlng) {
        switch (feature.properties["type"]) {
          case "WP":
            return L.marker(latlng, {icon: icon_WP});
          case"OBJ":
            return L.marker(latlng, {icon: icon_OBJ});
          case"HQ":
            return L.marker(latlng, {icon: icon_HQ});
          case"BAN":
            return L.marker(latlng, {icon: icon_BAN});
        }


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

    this.map = L.map('mapDiv').setView([44.57107392261764, 9.010503631358713], 15);


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
    map.addLayer(grid);
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
        'name': '' + label + '',
        'type': 'WP'
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
