import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiService } from '../service/api.service';
import { NavService } from '../service/nav.service';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { ChartConfiguration, ChartType } from 'chart.js'
import { BaseChartDirective } from 'ng2-charts';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';
import { NgToastService } from 'ng-angular-popup';
import { Dialog2Component } from '../dialog2/dialog2.component';
import { LoadingService } from '../service/loading.service';
import { Users } from '../class/users';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class DashboardComponent implements OnInit {
  loading$ = this.loader.loading$;
  solData: any;
  days: number = 1;
  userData: any;



  // chartOptions = {
  //   exportEnabled: true, 
  //   title: {
  //     text: "Ethereum Price",
  //   },
  //   axisX: {
  //     valueFormatString: "MMM",
  //     crosshair: {
  //       enabled: true,
  //       valueFormatString: "MMM YYYY",
  //       snapToDataPoint: true
  //     }
  //   },
  //   axisY: {
  //     title: "Price in USD",
  //     prefix: "$",
  //     crosshair: {
  //       enabled: true
  //     }
  //   },
  //   data:[{
  //     type: "candlestick",
  //     yValueFormatString: "$##.##",
  //     xValueFormatString: "MMM YYYY",
  //     dataPoints: [
  //       { x: new Date(2021, 0, 1), y: [737.708374, 1467.784912, 718.109497, 1314.986206] },
  //       { x: new Date(2021, 1, 1), y: [1314.855225, 2036.286499, 1274.357788, 1416.04895] },
  //       { x: new Date(2021, 2, 1), y: [1417.151123, 1947.837769, 1416.416138, 1918.362061] },
  //       { x: new Date(2021, 3, 1), y: [1919.157227, 2797.972412, 1912.178467, 2773.207031] },
  //       { x: new Date(2021, 4, 1), y: [2772.838379, 4362.350586, 1737.46875, 2714.945313] },
  //       { x: new Date(2021, 5, 1), y: [2707.560547, 2891.254883, 1707.600586, 2274.547607] },
  //       { x: new Date(2021, 6, 1), y: [2274.397461, 2551.161133, 1722.050781, 2536.209961] },
  //       { x: new Date(2021, 7, 1), y: [2530.462891, 3466.992188, 2449.353516, 3433.732666] },
  //       { x: new Date(2021, 8, 1), y: [3430.762451, 4022.469238, 2676.407471, 3001.678955] },
  //       { x: new Date(2021, 9, 1), y: [3001.129395, 4455.735352, 2978.654297, 4288.074219] },
  //       { x: new Date(2021, 10, 1), y: [4288.217285, 4891.70459, 3933.506592, 4631.479004] },
  //       { x: new Date(2021, 11, 1), y: [4623.679688, 4780.732422, 3525.494141, 3682.632813] }  
  //     ]
  //   }]
  // }	
  
  public lineChartData: ChartConfiguration['data'] = {
    datasets: [
      {
        data: [],
        label: `Solana Price Trends`,
        backgroundColor: 'rgba(148,159,177,0.2)',
        borderColor: '#5BC43B',
        pointBackgroundColor: '#5BC43B',
        pointBorderColor: '#5BC43B',
        pointHoverBackgroundColor: '#5BC43B',
        pointHoverBorderColor: '#5BC43B',

      }
    ],
    labels: []
  };
  public lineChartOptions: ChartConfiguration['options'] = {
    elements: {
      point: {
        radius: 1
      }
    },
    responsive: true,

    plugins: {
      legend: {
        display: true
      },
      title: {
        display: true,
        text: 'Solana Price Trends'
      },
    }
    
  };
  public lineChartType: ChartType = 'line';

  @ViewChild(BaseChartDirective) myLineChart !: BaseChartDirective;

  constructor(
    private nav: NavService,
    private solApi: ApiService,
    public dialog: MatDialog,
    private toast: NgToastService,
    private api: ApiService,
    private loader: LoadingService,
    private http:HttpClient
  ) { }

  ngOnInit(): void {
    this.nav.hide();
    this.getSolDetail();
    this.getSolanaGraphData(this.days);
  }

  openDialog() {
    this.dialog.open(DialogComponent, {
      width: '28%'
    }).afterClosed().subscribe(val => {
      if (val === 'save') {
        this.getAllProduct();
      }
    })
  }

  openDialog2() {
    this.dialog.open(Dialog2Component, {
      width: '28%'
    }).afterClosed().subscribe(val => {
      if (val === 'save') {
        this.getAllProduct();
      }
    })
  }
  getAllProduct() {
    // this.api.getProduct()
    //   .subscribe({
    //     next: (res) => {
    //       console.log(res)

    //     },
    //     error: (err) => {
    //       this.toast.error({ detail: 'ERROR!!!', summary: "Error while recording/fetching the data!!", duration: 5000 })
    //       // alert('error while recording/fetching the data')
    //     }
    //   })

  }
  getUserDetail() {
    this.solApi.getUsers()
      .subscribe(res => {
        this.userData = res;
        console.log(this.userData)
      })
  }

  getSolDetail() {
    this.solApi.getSolanaCurrency()
      .subscribe(res => {
        this.solData = res;
        console.log(this.solData)

      })
  }

  getSolanaGraphData(days: number) {
    this.days = days
    this.solApi.getSolanaDataGraphically(this.days)
      .subscribe(res => {
        setTimeout(() => {
          this.myLineChart.chart?.update();
        }, 100)

        console.log(res)
        this.lineChartData.datasets[0].data = res.prices.map((a: any) => {
          return a[1];
        });
        this.lineChartData.labels = res.prices.map((a: any) => {
          let date = new Date(a[0]);
          let time = date.getHours() > 12 ?
            `${date.getHours() - 12}: ${date.getMinutes()} PM` :
            `${date.getHours() - 12}: ${date.getMinutes()} AM`
          return this.days === 1 ? time : date.toLocaleDateString();
        })

      })
  }

}

