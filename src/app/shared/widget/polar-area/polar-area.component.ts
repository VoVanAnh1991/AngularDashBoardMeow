import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ApexAxisChartSeries, ChartComponent } from "ng-apexcharts";
import {
  ApexNonAxisChartSeries,
  ApexResponsive,
  ApexChart,
  ApexStroke,
  ApexFill
} from "ng-apexcharts";

export type ChartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  responsive: ApexResponsive[];
  labels: any;
  stroke: ApexStroke;
  fill: ApexFill;
};

@Component({
  selector: 'app-polar-area',
  templateUrl: './polar-area.component.html',
  styleUrls: ['./polar-area.component.scss']
})
export class PolarAreaComponent implements OnInit {;
  @Input() chartRooms: number;
  @Input() chartUserFriends: number;
  @Input() chartUserRooms: number;
  @Input() chartUserKeepbox: number;

  @ViewChild("chart", { static: false }) chart: ChartComponent;
  public chartOptions: Partial<ChartOptions> ;

  constructor( 
  ) {
    this.chartOptions = {
      series: [0,0,0,0],
      chart: {
        type: "polarArea"
      },
      labels: ["User Friends","User Rooms","Keep Box"]
      ,
      stroke: {
        colors: ["indianred"]
      },
      fill: {
        opacity: 0.8
      },
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200
            },
            legend: {
              position: "bottom"
            }
          }
        }
      ]
    } 
  }
  
  
  ngOnInit () {
  }

  ngAfterContentChecked(){
  }
}