import { map } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { employeemodel } from 'src/app/models/employee.model';
import { appservice } from '../app.service';

@Component({
  selector: 'app-employeelist',
  templateUrl: './employeelist.component.html',
  styleUrls: ['./employeelist.component.css']
})
export class EmployeelistComponent implements OnInit {
  employeedata: employeemodel[] = []
  loading: boolean = true;
  search: string = ''

  constructor(private http: HttpClient, private service: appservice) { }

  ngOnInit(): void {
    let token = localStorage.getItem('x-auth-token')
    let t = JSON.parse(`${token}`)
    let url = this.service.url;
    this.http.get<employeemodel[]>(`${url}/api/manegers/workers`, {
      headers: new HttpHeaders({
        'x-auth-token': t
      })
    }).pipe(map((res) => {
      let emp2: employeemodel[] = []
      for (let employee of res) {
        let _id = employee['_id']
        let name = employee['name']
        let email = employee['email']
        let lastLoginDate = employee['lastLoginDate']
        let employeeonboarddate = employee['employeeonboarddate']
        let employeeoffboarddate = employee['employeeoffboarddate']
        let licenseKey = employee['licenseKey']
        let activestatus = employee['activeStatus']
        let emp = new employeemodel(_id, name, email, lastLoginDate, employeeonboarddate, employeeoffboarddate, licenseKey, activestatus)
        emp2.push(emp)
      }
      return emp2
    })).subscribe((response) => {
      this.employeedata = response
      console.log(this.employeedata)
      this.loading = false
    })
  }

}
