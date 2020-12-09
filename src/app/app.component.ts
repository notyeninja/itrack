import { Component } from "@angular/core";

import { Platform } from "@ionic/angular";
import { SplashScreen } from "@ionic-native/splash-screen/ngx";
import { StatusBar } from "@ionic-native/status-bar/ngx";
import { DbService } from "./services/db/db.service";
import { GeoTrackingService } from "./services/geo/geo-tracking.service";
import {
  AndroidPermissionResponse,
  AndroidPermissions,
} from "@ionic-native/android-permissions/ngx";

@Component({
  selector: "app-root",
  templateUrl: "app.component.html",
  styleUrls: ["app.component.scss"],
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private dbService: DbService,
    private geoTracking: GeoTrackingService,
    private permission: AndroidPermissions
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.dbService.initializeDatabase();
      this.geoTracking.init();
      this.setupActivityPermission();
    });
  }

  setupActivityPermission() {
    this.permission
      .hasPermission("ACTIVITY_RECOGNITION")
      .then((resp: AndroidPermissionResponse) => {
        if (!resp.hasPermission) {
          this.permission
            .requestPermission("ACTIVITY_RECOGNITION")
            .then((resp: AndroidPermissionResponse) => {
              if (!resp) {
                throw new Error(
                  "Cannot use the application without this permision"
                );
              }
            });
        }
      });
  }
}
