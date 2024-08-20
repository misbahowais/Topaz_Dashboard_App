import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ChartsComponent } from '../../components/dashboard/charts/charts.component';
import { StatsCardComponent } from '../../components/dashboard/stats-card/stats-card.component';
import { TableComponent } from '../../components/dashboard/table/table.component';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { DashboardModel } from '../../model/dashboard/dashboard.model';
import { ResponseModel } from '../../model/response.model';
import { ChatService } from '../../service/chats/chats.service';
import { DashboardService } from '../../service/dashboard/dashboard.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [NavbarComponent,StatsCardComponent,CommonModule,TableComponent,ChartsComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {
  constructor(private dashboardService:DashboardService, private chat:ChatService){}
  ngOnInit(): void {
    this.getAll();
  }

  dashboardData:DashboardModel[] = [];
  isAPiCallMade:boolean = false;

  getAll(){
    this.dashboardService.getAll().subscribe((data:ResponseModel) => {
      this.dashboardData = data.requests as DashboardModel[];
      this.isAPiCallMade = true
      
    })
  }
  
}
