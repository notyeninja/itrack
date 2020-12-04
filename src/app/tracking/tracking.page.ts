import { Component, OnInit } from "@angular/core";
import { GeoTrackingService } from "../services/geo/geo-tracking.service";

@Component({
  selector: "app-tracking",
  templateUrl: "./tracking.page.html",
  styleUrls: ["./tracking.page.scss"],
})
export class TrackingPage implements OnInit {
  constructor(private trackingSvc: GeoTrackingService) {}

  ngOnInit() {}

  start() {
    this.trackingSvc.startTracing();
  }
  stop() {
    this.trackingSvc.stopTracing();
  }
}
