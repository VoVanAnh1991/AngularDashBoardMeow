import { Component, Input, OnInit, TemplateRef, ViewChild, ViewContainerRef, ViewRef } from '@angular/core';
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
  // @Input() chartUserFriends: number;
  @Input() chartUserFriends_Admin: number;
  @Input() chartUserFriends_Personal: number;
  @Input() chartUserRooms: number;
  @Input() chartUserKeepbox: number;

  @ViewChild("chart", { static: false }) chart: ChartComponent;
  public chartOptions: Partial<ChartOptions> ;
  
  isReloaded: boolean = false;
 
  @ViewChild('vc', { read: ViewContainerRef, static: true}) vc: ViewContainerRef;

  @ViewChild("tpl", { read: TemplateRef, static: true}) tpl: TemplateRef<any>;

  childViewRef: ViewRef;

  ngAfterViewInit(){
    this.childViewRef = this.tpl.createEmbeddedView(null);
  }

  insertChildView(){
    this.vc.insert(this.childViewRef);
  }

  removeChildView(){
    this.vc.detach();
  }

  reloadChildView(){
    this.isReloaded = true; 
    this.childViewRef = this.tpl.createEmbeddedView(null);
    this.removeChildView();
    this.insertChildView();
  }

  constructor( 
  ) {
    this.chartOptions = {
      series: [0, 0,0,0,0],
      chart: {
        type: "polarArea"
      },
      labels: ["Public Rooms", "User Friends - Admin", "User Friends - Personal", "User Rooms", "Keep Box"]
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
    this.chart && this.chart.render()
  }

  ngAfterViewChecked(){
  }
}