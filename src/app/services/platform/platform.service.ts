import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class PlatformService {

  public mobile: boolean = false;
  public browser: boolean = false;

  constructor(private platform: Platform) { 
    this.setPlatform();
  }

  private setPlatform() {
    if (this.platform.is('ios') || this.platform.is('android') && 
        !(this.platform.is('desktop') || this.platform.is('mobileweb'))
    ) {
      this.mobile = true;
    } else {
      this.browser = true;
    }
  }
}
