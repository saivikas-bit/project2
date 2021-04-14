import { Activity } from './../../../models/activity.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { appservice } from '../../app.service';

@Component({
  selector: 'app-activitylog',
  templateUrl: './activitylog.component.html',
  styleUrls: ['./activitylog.component.css']
})
export class ActivitylogComponent implements OnInit {
  activity: Activity[] = []
  loading: boolean = true;

  constructor(private http: HttpClient, private service: appservice) { }

  ngOnInit(): void {
    let url = this.service.url;
    let token = localStorage.getItem('x-auth-token')
    let t = JSON.parse(`${token}`)
    this.http.get<Activity[]>(`${url}/api/users/activitystatus`, {
      headers: new HttpHeaders({
        'x-auth-token': t
      })
    }).subscribe((res) => {
      this.loading = !this.loading
      this.activity = res.map((emp) => {
        let empname = emp['system_name']
        let activitydate = emp['activitydate']
        let latestAppUsed = emp['name']
        let single = new Activity(activitydate, latestAppUsed, empname)
        return single
        // else {
        //   return new Activity('not active', 'not active', 'not active')
        // }
      })
      console.log(this.activity)
      // this.date=res['activitydate']

    })
  }

}
