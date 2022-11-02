import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { DialogComponent } from './dialog.component';

import { DialogRoutingModule } from './dialog-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DialogRoutingModule
  ],
  declarations: [ 
    DialogComponent 
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class DialogModule {}
