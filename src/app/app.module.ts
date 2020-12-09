import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { RouteReuseStrategy } from "@angular/router";

import { IonicModule, IonicRouteStrategy } from "@ionic/angular";
import { SplashScreen } from "@ionic-native/splash-screen/ngx";
import { StatusBar } from "@ionic-native/status-bar/ngx";

import { AppComponent } from "./app.component";
import { AppRoutingModule } from "./app-routing.module";
import { DbService } from "./services/db/db.service";
import { BackgroundGeolocation } from "@ionic-native/background-geolocation/ngx";
import { DeviceMotion } from "@ionic-native/device-motion/ngx";
import { SQLite } from "@ionic-native/sqlite/ngx";
import { AndroidPermissions } from "@ionic-native/android-permissions/ngx";

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    DbService,
    BackgroundGeolocation,
    DeviceMotion,
    SQLite,
    AndroidPermissions,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
