import {Component, OnInit} from '@angular/core';
import {MapService} from '../map.service';
import {forEach} from '@angular/router/src/utils/collection';

@Component({
    selector: 'app-waypoint',
    templateUrl: './waypoint.component.html',
    styleUrls: ['./waypoint.component.css']
})
export class WaypointComponent implements OnInit {
    x = this.mapService.getWaypointList();


    constructor(private mapService: MapService) {
    }

    ngOnInit() {
        this.mapService.testGeoJson();


    }


    addWaypoint() {
        this.mapService.addWaypoint(44.860117, 7.352257936671143, '/assets/Icons/point.png', 'porcoddio 4');
    }

    getFeatures() {
        return this.x.features;
    }

    getCenter() {
        return this.mapService.getCenter();
    }

    centerTo(lat, long, zoom) {
        this.mapService.centerTo(lat, long, zoom);
    }

}
