import { Component, OnInit, ViewChild } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ChartComponent } from "ng-apexcharts";
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
export class PolarAreaComponent implements OnInit {
  messFormRooms: number;
  messUserFriends: number;
  messUserRooms: number;
  messUserKeepBox: number;

  @ViewChild("chart", null) chart: ChartComponent;
  public chartOptions: Partial<ChartOptions>;

  constructor( 
    private db: AngularFirestore,
  ) {
    this.chartOptions = {
      series: [20,23,12,41],
      chart: {
        type: "polarArea"
      },
      labels: ["Public Rooms","User Friends","User Rooms","Keep Box"]
      ,
      stroke: {
        colors: ["#fff"]
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
    };
  }

  ngOnInit () {
    console.log()
  }
}