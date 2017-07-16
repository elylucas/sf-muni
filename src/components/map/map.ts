import { Component, Input } from '@angular/core';
import _ from 'lodash';

@Component({
  selector: 'map',
  templateUrl: 'map.html'
})
export class MapComponent {
  @Input() routeConfig: RouteConfig;
  @Input() vehicles: Vehicle[];
  map: any;
  currentScale = 3;
  vehicleMarkerTable: any = {};
  pathLinesTable: any[] = [];

  constructor() {
  }

  ngOnChanges(changes) {
    if (!this.map) { this.initMap(); }

    if (changes.routeConfig) {
      this.clearMarkers();
      this.clearRoutePath();
      this.loadMap();
      this.renderRoutePath();
    }
    if (changes.vehicles) {
      this.vehicles.forEach(v => {
        this.addMarker(this.routeConfig, v);
      });
    }
  }

  clearMarkers() {
    _.each(this.vehicleMarkerTable, vehicleMarker => {
      vehicleMarker.setMap(null);
    });
    this.vehicleMarkerTable = {};
  }

  clearRoutePath() {
    this.pathLinesTable.forEach(p => p.setMap(null));
    this.pathLinesTable = [];
  }

  initMap() {
    this.map = new google.maps.Map(document.getElementById('transitMap'), {
      zoom: 12,
      disableDefaultUI: true,
      zoomControl: true,
      scaleControl: true
    });
    google.maps.event.addListener(this.map, 'zoom_changed', () => {
      this.resizeMarkers();
    });
  }

  loadMap() {
    const bounds = new google.maps.LatLngBounds(
      { lat: this.routeConfig.latMin, lng: this.routeConfig.lonMin },
      { lat: this.routeConfig.latMax, lng: this.routeConfig.lonMax }
    );
    this.map.fitBounds(bounds, 0);
  }

  addMarker(routeConfig: RouteConfig, vehicle: Vehicle) {
    let marker;
    if (this.vehicleMarkerTable[vehicle.id]) {
      marker = this.vehicleMarkerTable[vehicle.id];
      if (!marker.map) { marker.setMap(this.map); }
    } else {
      marker = new google.maps.Marker({
        map: this.map,
        title: vehicle.id.toString()
      });
      marker.vehicleId = vehicle.id;
    }
    marker.setPosition({ lat: vehicle.lat, lng: vehicle.lon });
    marker.setIcon({
      path: google.maps.SymbolPath.FORWARD_CLOSED_ARROW,
      strokeColor: `#${routeConfig.color}`,
      strokeWeight: 3,
      scale: this.currentScale,
      rotation: vehicle.heading
    });
    this.vehicleMarkerTable[vehicle.id] = marker;
  }

  renderRoutePath() {
    this.routeConfig.paths.forEach(path => {
      let points = path.points.map(point => {
        return { lat: point.lat, lng: point.lon };
      });

      const pathLine = new google.maps.Polyline({
        path: points,
        strokeColor: `#${this.routeConfig.color}`,
        strokeWeight: 2,
        strokeOpacity: 0.9,
        map: this.map
      });
      this.pathLinesTable.push(pathLine);
    });
  }

  resizeMarkers() {
    let zoomLevel = this.map.getZoom();
    this.currentScale = zoomLevel / 3;
    _.each(this.vehicleMarkerTable, vm => {
      let icon = vm.getIcon();
      icon.scale = this.currentScale;
      vm.setIcon(icon);
    });
  }

}
