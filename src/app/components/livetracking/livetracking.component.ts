import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { appservice } from '../app.service';
@Component({
  selector: 'app-livetracking',
  templateUrl: './livetracking.component.html',
  styleUrls: ['./livetracking.component.css']
})
export class LivetrackingComponent implements OnInit {
  onlineemps: any[] = []


  constructor(private socket: Socket, private http: HttpClient, private service: appservice) { }

  ngOnInit(): void {
    this.socket.on("connect", () => {
      console.log("connected to the server");
    });

    this.socket.emit("subscribe"); //connecting room also required valid token
    this.socket.on("image", (info: any) => {
      if (!(this.onlineemps.filter(e => e.workerid === info.workerID).length > 0)) {
        // console.log()
        this.onlineemps.push({ workerid: info.workerID, imageurl: `data:image/jpeg;base64,${info.buffer}`, workername: info.name, systemname: info.system_name })
        // console.log(this.onlineemps)
      }
      else {
        this.onlineemps.map((res) => {
          if (res.workerid === info.workerID) {
            res.imageurl = `data:image/jpeg;base64,${info.buffer}`
          }
        })
      }
      console.log(this.onlineemps)
    })
  }
  openlivetracking(workerid: any) {
    // let url = this.service.url;
    window.open(`/livetrackingpage/${workerid}`, 'window Name', "height=400,width=1200,location=no,toolbar=no,menubar=no,scrollbars=yes,resizable=yes")
  }

}
