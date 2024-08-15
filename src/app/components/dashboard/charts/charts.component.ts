import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { DashboardModel } from '../../../model/dashboard/dashboard.model';
import { DashboardService } from '../../../service/dashboard/dashboard.service';

declare var google: any;
@Component({
  selector: 'app-charts',
  standalone: true,
  imports: [],
  templateUrl: './charts.component.html',
  styleUrl: './charts.component.scss'
})
export class ChartsComponent implements OnInit, AfterViewInit {
  constructor(private dashboardService: DashboardService) { }
  ngOnInit(): void {
    this.getDataForChart();
  }
  ngAfterViewInit() {
    this.getDataForChart();

  }
  @ViewChild('pieChart') pieChart: ElementRef | undefined
  chartData: Array<string | number>[] = [];
  @Input() dashboardData: DashboardModel[] = [];
  drawChart = () => {

    const data = google.visualization.arrayToDataTable(this.chartData);

    const options = {
      title: 'Open Tickets',
      legend: { position: 'top' }
    };

    const chart = new google.visualization.PieChart(this.pieChart?.nativeElement);

    chart.draw(data, options);
  }

  getDataForChart() {
    this.chartData = [['Ticket', 'Teams'], ...this.dashboardService.getDataForChart(this.dashboardData)];

    google.charts.load('current', { 'packages': ['corechart'] });
    google.charts.setOnLoadCallback(this.drawChart);
  }

}
