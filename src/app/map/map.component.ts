import {Component, OnInit} from '@angular/core';
import {ɵh23} from '@angular/material';
import {MapService} from '../map.service';


declare let L;

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

  constructor(private  mapService: MapService) {
  }

  ngOnInit() {
    this.mapService.initializeMap();
   }
/*
  setDrawingColor() {
    this.drawControl.setDrawingOptions({
      rectangle: {
        shapeOptions: {
          color: '#0000FF'
        }
      }
    });
  }

*/


}
