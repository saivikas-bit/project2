import { Router } from '@angular/router';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-topnav',
  templateUrl: './topnav.component.html',
  styleUrls: ['./topnav.component.css']
})
export class TopnavComponent implements OnInit {
  // @ViewChild('mydiv', { static: true },) element!: ElementRef<HTMLInputElement>;
  images = [700, 800, 807].map((n) => `https://picsum.photos/id/${n}/900/500`);
  settings = false;
  closeResult: string | undefined;
  image: any = "../../../assets/user.png";
  constructor(private router: Router, private modalService: NgbModal, private config: NgbCarouselConfig) {

  }
  open(content: any) {
    this.image = "../../../assets/user.png"
    this.settings = false
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', size: "lg" }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    // this.image = ''
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }

  }


  ngOnInit(): void {
    this.config.interval = 2000;

  }
  settingclicker() {
    this.settings = !this.settings;
  }
  logout() {
    localStorage.clear();
    this.router.navigate(['/'])
  }
  upload(element: HTMLInputElement) {
    element.click()

  }
  uploadfile(value: any) {
    let reader = new FileReader();
    reader.readAsDataURL(value.target.files[0])
    // console.log(value.target.files[0])
    reader.onload = (event: any) => { // called once readAsDataURL is completed
      this.image = event.target.result;
    }
    console.log(this.image)
  }

}
