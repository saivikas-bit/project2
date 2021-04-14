import { Injectable } from "@angular/core";
import { Subject } from "rxjs";


@Injectable(
    {
        providedIn: 'root'
    }
)
export class appservice {
    //url = 'http://localhost:8080'
    url = 'http://app.pulseye.in';
    // url2 = 'http://localhost:4200';

    offlinenumber = new Subject<number>();
    onlinenumber = new Subject<number>();
    daterange = new Subject<object>();
    // logintoken=new Subject<string | null>()
}