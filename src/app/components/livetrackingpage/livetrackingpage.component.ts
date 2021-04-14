
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import * as moment from 'moment';
// import { Socket } from 'SocketIoModule';
import { Socket } from 'ngx-socket-io';
@Component({
  selector: 'app-livetrackingpage',
  templateUrl: './livetrackingpage.component.html',
  styleUrls: ['./livetrackingpage.component.css']
})
export class LivetrackingpageComponent implements OnInit {
  image: string = '';
  employeeid: string = '';
  name: String = '';
  systemid: String = '';
  date = moment().format('MMMM Do YYYY, h:mm:ss a');
  constructor(private socket: Socket, private router: ActivatedRoute) { }

  ngOnInit(): void {
    this.router.params.subscribe((params: Params) => {
      this.employeeid = params['empid']
    })
    this.socket.on("connect", () => {
      console.log("connected to the server");
    });

    this.socket.emit("subscribe"); //connecting room also required valid token
    this.socket.on("image", (info: any) => {
      if (this.employeeid === info.workerID) {
        this.name = info.name;
        this.systemid = info.system_name;
        this.image = `data:image/jpeg;base64,${info.buffer}`
      }

    })

  }

}
