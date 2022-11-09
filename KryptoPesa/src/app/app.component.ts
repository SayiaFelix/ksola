import { Component, OnInit } from '@angular/core';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'KryptoPesa';
  isDarkTheme:boolean =false


  constructor() { }
  ngOnInit(): void {
    this.isDarkTheme = localStorage.getItem('theme')==="Dark" ? true:false;

  }
  storedThemeSelection(){
    localStorage.setItem('theme',this.isDarkTheme? "Dark":"Light");
  }
}
