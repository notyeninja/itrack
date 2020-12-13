import { Injectable } from "@angular/core";
import { OnPageDisplayService } from "../on-page-display.service";

import {
  BackgroundGeolocation,
  BackgroundGeolocationConfig,
  BackgroundGeolocationEvents,
  BackgroundGeolocationLocationProvider,
  BackgroundGeolocationResponse,
} from "@ionic-native/background-geolocation/ngx";
import { DbService } from "../db/db.service";
import { DeviceMotion } from "@ionic-native/device-motion/ngx";

@Injectable({
  providedIn: "root",
})
export class GeoTrackingService {
  private aQueue = [];
  private config: BackgroundGeolocationConfig = {
    locationProvider: BackgroundGeolocationLocationProvider.ACTIVITY_PROVIDER,
    desiredAccuracy: 0,
    stationaryRadius: 5,
    distanceFilter: 5,
    notificationTitle: "iNative Running",
    notificationText: "Keeping track of things.",
    debug: true,
    interval: 5000,
    fastestInterval: 10000,
    activitiesInterval: 5000,
    stopOnTerminate: true,
    stopOnStillActivity: false,
    startForeground: true,
  };

  constructor(
    private backgrounGeoLocation: BackgroundGeolocation,
    private dbService: DbService,
    private devicemotion: DeviceMotion,
    private onPageService: OnPageDisplayService
  ) {}

  init() {
    this.backgrounGeoLocation.configure(this.config).then(() => {
      this.backgrounGeoLocation
        .on(BackgroundGeolocationEvents.location)
        .subscribe((location: BackgroundGeolocationResponse) => {
          let dataToSave = {
            displacement: null,
            position: location,
          };

          this.devicemotion.getCurrentAcceleration().then((v) => {
            dataToSave.displacement = v;
            this.aQueue.push(dataToSave);
            //  this.onPageService.nextItem(this.aQueue);
            this.dbService.insertTestData(dataToSave);
          });

          this.aQueue.push(dataToSave);
          //this.onPageService.nextItem(this.aQueue);
          this.dbService.insertTestData(dataToSave);
          this.backgrounGeoLocation.finish();
        });

      this.backgrounGeoLocation
        .on(BackgroundGeolocationEvents.error)
        .subscribe((err) => {
          this.dbService.insertError(JSON.stringify(err));
        });

      this.backgrounGeoLocation
        .on(BackgroundGeolocationEvents.stop)
        .subscribe(() => {
          this.backgrounGeoLocation.removeAllListeners();
        });
    });
  }

  startTracing() {
    this.aQueue = [];
    this.backgrounGeoLocation.start();
  }

  stopTracing() {
    this.backgrounGeoLocation.stop();
  }

  getRecords() {
    return this.aQueue.length;
  }
}
