import { Injectable } from "@angular/core";
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
  private config: BackgroundGeolocationConfig = {
    locationProvider:
      BackgroundGeolocationLocationProvider.DISTANCE_FILTER_PROVIDER,
    desiredAccuracy: 0,
    stationaryRadius: 20,
    distanceFilter: 20,
    notificationTitle: "iNative Running",
    notificationText: "Keeping track of things.",
    debug: true,
    interval: 2000,
    fastestInterval: 5000,
    activitiesInterval: 5000,
    stopOnTerminate: true,
    stopOnStillActivity: true,
    startForeground: true,
  };

  constructor(
    private backgrounGeoLocation: BackgroundGeolocation,
    private dbService: DbService,
    private devicemotion: DeviceMotion
  ) {}

  init() {
    this.backgrounGeoLocation.configure(this.config).then(() => {
      this.backgrounGeoLocation
        .on(BackgroundGeolocationEvents.location)
        .subscribe((location: BackgroundGeolocationResponse) => {
          let dataToSave = {
            displacement: null,
            position: {
              lat: location.latitude,
              lng: location.longitude,
              altitude: location.altitude,
              bearing: location.bearing,
              speed: location.speed,
              timestamp: location.time,
            },
          };

          this.devicemotion.getCurrentAcceleration().then((v) => {
            dataToSave.displacement = v;
            this.dbService.insertTestData(dataToSave);
          });

          this.dbService.insertLogs({
            log: `sending insert to database`,
            time: Date.now(),
          });
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
    this.backgrounGeoLocation.start();
  }

  stopTracing() {
    this.backgrounGeoLocation.stop();
  }
}
