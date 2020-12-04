import { Component, OnInit } from "@angular/core";
import { DbService } from "../services/db/db.service";

@Component({
  selector: "app-track-result",
  templateUrl: "./track-result.page.html",
  styleUrls: ["./track-result.page.scss"],
})
export class TrackResultPage implements OnInit {
  data: any = [];
  constructor(private dbService: DbService) {}

  ngOnInit() {}

  async getData() {
    this.data = await this.dbService.getTestData();
  }
}
