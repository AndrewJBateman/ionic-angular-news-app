import { Injectable } from "@angular/core";
import { Network } from "@ionic-native/network/ngx";
import { Platform } from "@ionic/angular";
import { Observable, merge, of, fromEvent } from "rxjs";
import { mapTo } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class NetworkService {
  private connected: Observable<boolean> = undefined;

  constructor(public network: Network, public platform: Platform) {
    this.connected = new Observable((observer) => {
      observer.next(true);
    }).pipe(mapTo(true));

    if (this.platform.is("cordova")) {
      // on phone device
      this.connected = merge(
        this.network.onConnect().pipe(mapTo(true)),
        this.network.onDisconnect().pipe(mapTo(false))
      );
    } else {
      // on browser
      this.connected = merge(
        of(navigator.onLine),
        fromEvent(window, "online").pipe(mapTo(true)),
        fromEvent(window, "offline").pipe(mapTo(false))
      );
    }
  }

  public getNetworkType(): string {
    return this.network.type;
  }

  // returns network connected true or false
  public getNetworkStatus(): Observable<boolean> {
    return this.connected;
  }

  public refreshPage(event: any) {
    setTimeout(() => {
      event.target.complete();
    }, 2000);
  }
}
