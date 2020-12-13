import { Injectable } from "@angular/core";
import { Subject } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class OnPageDisplayService {
  private itemsSubject = new Subject<Array<any>>();

  get items$() {
    return this.itemsSubject.asObservable();
  }

  nextItem(item) {
    this.itemsSubject.next(item);
  }
}
