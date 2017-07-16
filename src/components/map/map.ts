import { Component, Input } from '@angular/core';
import _ from 'lodash';

@Component({
  selector: 'map',
  templateUrl: 'map.html'
})
export class MapComponent {
  @Input() routeInfos: RouteInfo[];
  @Input() selectedRouteInfo: RouteInfo;
  map: any;
  currentZoom: number = 12;
  currentScale = 3;
  vehicleMarkerTable: any = {};
  pathLines: any[] = [];

  constructor() {
  }

  ngOnChanges(changes) {
    if (!this.map) { this.initMap(); }

    if (changes.selectedRouteInfo) {
      this.loadMap();
      this.routeInfos.forEach(routeInfo => {
        this.addMarkers(routeInfo);

      });
    }

    if (changes.routeInfos) {
      this.loadMap();
      this.routeInfos.forEach(routeInfo => {
        this.addMarkers(routeInfo);

      });
      // this.selectedRouteInfo.vehicles.forEach(v => {
      //   this.addMarker(v, this.map);
      // });
    }
  }

  initMap() {
    this.map = new google.maps.Map(document.getElementById('transitMap'), {
      zoom: this.currentZoom,
      center: { lat: 37.7591721, lng: -122.442237 },
      disableDefaultUI: true,
      zoomControl: true,
      scaleControl: false
    });
    google.maps.event.addListener(this.map, 'zoom_changed', () => {
      let zoomLevel = this.map.getZoom();
      this.currentScale = zoomLevel / 3;
      //this.updateMarkers();
    });
  }

  loadMap() {

    // _.each(this.vehicleMarkerTable, vehicleMarker => {
    //   vehicleMarker.setMap(null);
    // });
    // this.vehicleMarkerTable = {};

    // this.pathLines.forEach(p => p.setMap(null));
    // this.pathLines = [];

    const routeConfig = this.selectedRouteInfo.routeConfig;

    const bounds = new google.maps.LatLngBounds(
      { lat: routeConfig.latMin, lng: routeConfig.lonMin },
      { lat: routeConfig.latMax, lng: routeConfig.lonMax }
    );
    //this.map.fitBounds(bounds, 0);

    const paths = routeConfig.paths.map(path => {
      return path.points.map(point => {
        return { lat: point.lat, lng: point.lon };
      });
    });

    paths.forEach(path => {
      const pathLine = new google.maps.Polyline({
        path: path,
        strokeColor: `#${routeConfig.color}`,
        strokeWeight: 2,
        map: this.map
      });
      this.pathLines.push(pathLine);
    });

  }

  addMarkers(routeInfo: RouteInfo) {

    const strokeOpacity = routeInfo.routeConfig.tag === this.selectedRouteInfo.routeConfig.tag ? 1 : 0.2;

    routeInfo.vehicles.forEach(vehicle => {

      if (this.vehicleMarkerTable[vehicle.id]) {
        let marker = this.vehicleMarkerTable[vehicle.id];
        if (!marker.map) { marker.setMap(this.map); }
        marker.setPosition({ lat: vehicle.lat, lng: vehicle.lon });
        marker.setIcon({
          path: google.maps.SymbolPath.FORWARD_CLOSED_ARROW,
          strokeColor: `#${routeInfo.routeConfig.color}`,
          strokeWeight: 3,
          strokeOpacity: strokeOpacity,
          scale: this.currentScale,
          rotation: vehicle.heading
        });
      } else {
        let marker = new google.maps.Marker({
          position: { lat: vehicle.lat, lng: vehicle.lon },
          map: this.map,
          title: vehicle.id.toString()
        });
        marker.setIcon({
          path: google.maps.SymbolPath.FORWARD_CLOSED_ARROW,
          strokeColor: `#${routeInfo.routeConfig.color}`,
          strokeWeight: 3,
          strokeOpacity: strokeOpacity,
          scale: this.currentScale,
          rotation: vehicle.heading
        });
        marker.vehicleId = vehicle.id;
        this.vehicleMarkerTable[vehicle.id] = marker;
      }

    });
  }

  updateMarkers() {
    _.each(this.vehicleMarkerTable, vm => {
      vm.setIcon({
        path: google.maps.SymbolPath.FORWARD_CLOSED_ARROW,
        strokeColor: 'green',
        strokeWeight: 3,
        scale: this.currentScale,
        rotation: vm.getIcon().rotation
      });
    });
  }

}
