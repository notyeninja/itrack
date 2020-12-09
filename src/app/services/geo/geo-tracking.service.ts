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
    locationProvider: BackgroundGeolocationLocationProvider.RAW_PROVIDER,
    desiredAccuracy: 10,
    stationaryRadius: 10,
    distanceFilter: 10,
    notificationTitle: "iNative Running",
    notificationText: "Keeping track of things.",
    debug: true,
    interval: 5000,
    fastestInterval: 10000,
    activitiesInterval: 5000,
    stopOnTerminate: true,
    stopOnStillActivity: false,
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
