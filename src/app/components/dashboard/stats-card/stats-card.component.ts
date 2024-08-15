import { AfterViewChecked, Component, Input, OnInit } from '@angular/core';
import { DashboardModel } from '../../../model/dashboard/dashboard.model';
import { DashboardStatsModel } from '../../../model/dashboard/dashboardStatsModel';
import { DashboardService } from '../../../service/dashboard/dashboard.service';

@Component({
  selector: 'app-stats-card',
  standalone: true,
  imports: [],
  templateUrl: './stats-card.component.html',
  styleUrl: './stats-card.component.scss'
})
export class StatsCardComponent implements OnInit {
  constructor(private dashboardService: DashboardService) { }
  ngOnInit(): void {
    this.getStats();
  }
  @Input() dashboardData: DashboardModel[] = [];


  dashboardStats: DashboardStatsModel = {
    openTicket: 0,
    unassignedTicket: 0,
    highPriorityTicket: 0,
    changeRequestTicket: 0
  }

  getStats() {
    this.dashboardStats = this.dashboardService.getStats(this.dashboardData);
  }

}
