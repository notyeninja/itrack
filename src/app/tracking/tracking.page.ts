import { Component, OnInit } from "@angular/core";
import { GeoTrackingService } from "../services/geo/geo-tracking.service";
import { OnPageDisplayService } from "../services/on-page-display.service";

@Component({
  selector: "app-tracking",
  templateUrl: "./tracking.page.html",
  styleUrls: ["./tracking.page.scss"],
})
export class TrackingPage implements OnInit {
  items = [];
  recordsNum: number;

  constructor(
    private trackingSvc: GeoTrackingService,
    private onPageDisplay: OnPageDisplayService
  ) {}
  ngOnInit() {
    this.onPageDisplay.items$.subscribe((items) => {
      this.items = [...items];
    });
  }

  start() {
    this.trackingSvc.startTracing();
  }
  stop() {
    this.trackingSvc.stopTracing();
  }
  getRecords() {
    this.recordsNum = this.trackingSvc.getRecords();
  }
}
