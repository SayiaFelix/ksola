import { Component } from '@angular/core';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
 title = 'KryptoPesa';
  isChecked: boolean= false;
  mode : string=''
 
  changed(event:MatSlideToggleChange):void{

  }
}
