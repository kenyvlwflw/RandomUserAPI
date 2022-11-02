import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
})
export class DialogComponent implements OnInit {

  public user: any;
  public birthday: string = '';
  public registeredDate: string = '';

  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {
    this.DateFormat();
  }

  DateFormat() {
    if (this.user && this.user.dob && this.user.dob.date) {
      this.birthday = new Date(this.user.dob.date).toLocaleDateString();
    }

    if (this.user && this.user.registeredDate && this.user.registeredDate.date) {
      this.registeredDate = new Date(this.user.registeredDate.date).toLocaleDateString();
    }
  }

  Close(){
    this.modalCtrl.dismiss();
  }

}
