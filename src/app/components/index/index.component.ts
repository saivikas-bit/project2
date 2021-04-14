import { Component, OnInit } from '@angular/core';
import { appservice } from '../app.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {
  online: number = 0;
  offline: number = 0;
  // token:string |null=''
  constructor(private service: appservice) { }

  ngOnInit(): void {

    this.service.onlinenumber.subscribe((res) => {
      this.online = res
    })
    this.service.offlinenumber.subscribe((res) => {
      this.offline = res;
    })
  }

}
