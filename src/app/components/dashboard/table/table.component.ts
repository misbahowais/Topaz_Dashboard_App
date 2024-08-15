import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { DashboardModel } from '../../../model/dashboard/dashboard.model';
import { DashboardTableModel } from '../../../model/dashboard/dashboardTable.model';
import { DashboardService } from '../../../service/dashboard/dashboard.service';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss'
})
export class TableComponent {
  constructor(private dashboardService: DashboardService) { }
  ngOnInit(): void {
    this.getStats();
  }
  @Input() dashboardData: DashboardModel[] = [];


  dashboardTableData: DashboardTableModel[] = [];

  getStats() {
    this.dashboardTableData = this.dashboardService.getTableData(this.dashboardData);
  }
}
