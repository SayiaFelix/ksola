import { Component, OnInit } from '@angular/core';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'KryptoPesa';

  storedTheme: string | null = localStorage.getItem('theme-color')
  constructor() { }
  ngOnInit(): void {

  }
  setTheme(theme: any) {
    localStorage.setItem('theme-color', theme);
    this.storedTheme = localStorage.getItem('theme-color')
  }
}
