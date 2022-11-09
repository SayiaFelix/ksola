import { Component, OnInit } from '@angular/core';
import { ApiService } from '../service/api.service';
import { LoadingService } from '../service/loading.service';
import { NavService } from '../service/nav.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  isDarkTheme:boolean =true
  loading$ = this.loader.loading$;

  constructor(private apiCoin: ApiService,
    public nav: NavService,
    private loader: LoadingService
  ) { }


  coinData: any = [];

  ngOnInit(): void {
    this.getCoinData();
    this.isDarkTheme = localStorage.getItem('theme')==="Dark" ? true:false;
  }
  storedThemeSelection(){
    localStorage.setItem('theme',this.isDarkTheme? "Dark":"Light");
  }
  getCoinData() {
    this.apiCoin.getCurrencyTrending()
      .subscribe(res => {
        console.log(res)
        this.coinData = res
      })
  }



}
