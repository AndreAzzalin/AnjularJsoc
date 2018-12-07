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
        this.mapService.loadGeoJson();
    }


    removeWaypoint(name) {
        this.mapService.removeWaypoint(name);
        this.mapService.loadGeoJson();
    }

    addWaypoint(nord, est, label) {
        this.mapService.addWaypoint(nord, est, '/assets/Icons/point.png', label);
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
