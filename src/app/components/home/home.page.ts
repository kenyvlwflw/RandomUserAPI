import { Component, ViewChild } from '@angular/core';
import { AlertController, IonInfiniteScroll, ModalController } from '@ionic/angular';
import { Storage } from '@ionic/storage';

import { DialogComponent  } from '../dialog/dialog.component';
import { UserService } from 'src/app/services/user/user.service';
import { PlatformService } from 'src/app/services/platform/platform.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;

  displayedColumns: string[] = ['picture', 'name', 'email'];

  public users: any = [];

  public lastSearch: string = '';
  public search: string = '';

  public formGenderF: boolean = false;
  public formGenderM: boolean = false;

  public loading: boolean = false;

  private format: string = 'json';
  private page: number = 1;
  private results: number = 20;
  private gender: string = '';
  private nationality: string = 'br';

  constructor(private alertCtrl: AlertController,
              private modalCtrl: ModalController,
              public platformService: PlatformService,
              private storage: Storage,
              private userService: UserService,              
  ) { this.storage.create(); }

  ngOnInit() {
    this.GetGenderStorage();
  }

  GetGenderStorage() {
    this.storage.get('gender').then(result => {
      
      if (result) {
        this.formGenderF = result.female;
        this.formGenderM = result.male;
      } else {
        this.formGenderF = this.formGenderM = true;
      }
      
      this.ChangeGender();
    });
  }

  GetUsers(loadmore?) {
    this.loading = true;
    let filter = '?format='+ this.format +
                  '&page=' + this.page.toString() +
                  '&results=' + this.results.toString();

    if (this.gender) filter += '&gender=' + this.gender;
    if (this.nationality) filter += '&nationality=' + this.nationality;

    this.userService.getUrl('https://randomuser.me/api/', filter).subscribe((result) => {
      if (result) {
        if (loadmore) {
          for (let user of result.results) {
            this.users.push(user);
          }
        } else {
          this.users = result.results;
        }
      }

      this.loading = false;
    },(err) => {
      
      this.loading = false;
      this.alertCtrl.create({
        header: 'Error',
        message: err,
        buttons: [
          {
            text: 'Ok',
            handler: () => {
            }
          },
        ]
      });
    });
  }

  ChangeGender() {
    if (this.formGenderF == this.formGenderM) {
      this.gender = '';
    } else if (this.formGenderF) {
      this.gender = 'female';
    } else if (this.formGenderM) {
      this.gender = 'male';
    }

    this.storage.set('gender', {
      female: this.formGenderF,
      male: this.formGenderM
    });

    this.GetUsers();
  }

  async OpenUser(user): Promise<void> {
    if (user) {
      const modal = await this.modalCtrl.create({
        component: DialogComponent,
        componentProps: { 
          user: user
        }
      });
      await modal.present();
    }
  }
}
