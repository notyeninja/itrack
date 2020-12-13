import { Component, OnInit } from "@angular/core";
import { DbService } from "../services/db/db.service";

@Component({
  selector: "app-logs",
  templateUrl: "./logs.page.html",
  styleUrls: ["./logs.page.scss"],
})
export class LogsPage implements OnInit {
  logs: any;
  constructor(private dbService: DbService) {}

  ngOnInit() {}

  async getLogs() {
    this.logs = await this.dbService.getLogs();
  }
}
