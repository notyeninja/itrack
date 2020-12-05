import { Component } from "@angular/core";
import { DbService } from "../services/db/db.service";

@Component({
  selector: "app-home",
  templateUrl: "home.page.html",
  styleUrls: ["home.page.scss"],
})
export class HomePage {
  constructor(private dbStore: DbService) {}

  async cleanStore() {
    await this.dbStore.cleanData();
  }
}
