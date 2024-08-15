import { HttpClient, HttpClientModule } from "@angular/common/http";
import { Observable } from "rxjs";
import { Injectable } from "@angular/core";
import { EndPoints } from "../../const/endpoints.const";
import { DashboardModel } from "../../model/dashboard/dashboard.model";
import { ResponseModel } from "../../model/response.model";
import { DashboardStatsModel } from "../../model/dashboard/dashboardStatsModel";
import { DashboardTableModel } from "../../model/dashboard/dashboardTable.model";

@Injectable({
    providedIn: 'root',
})

export class DashboardService {
    constructor(private http: HttpClient) {}
    // courseApi: string = urlModel.url + "/Course";


    getAll(): Observable<ResponseModel> {
        console.log("dsd");
        return this.http.get<ResponseModel>(EndPoints.ticket);
    }
    getStats(dashboardData: DashboardModel[]): DashboardStatsModel {
        let dashboardStatsModel:DashboardStatsModel = {
            openTicket: 0,
            unassignedTicket: 0,
            highPriorityTicket: 0,
            changeRequestTicket: 0
        }
        for(var item of dashboardData){
            if(item.status.toLowerCase().trim() == "open"){
                dashboardStatsModel.openTicket += 1;
                if(item.supportRep == null){
                }
            }  if(item.status.toLowerCase().trim() == "open" && item.supportRep == null){
           
                dashboardStatsModel.unassignedTicket += 1;
            }  if(item.status.toLowerCase().trim() == "open" && item.priority.toLowerCase().trim() == "high"){
                dashboardStatsModel.highPriorityTicket += 1;
                
            }  if(item.status.toLowerCase().trim() == "open" && item.type.toLowerCase().trim() == "change request"){
                dashboardStatsModel.changeRequestTicket += 1;
            }
        }
        return dashboardStatsModel;
    }

    getTableData(dashboardData: DashboardModel[]):DashboardTableModel[]{
        let dashboardTableDic:IterableIterator<[string, number]> = this.getDicForRepVsTicket(dashboardData).entries();
        let dashboardDataTable:DashboardTableModel[] = [];
       
       
        for(const [key, value] of dashboardTableDic){
            let data:DashboardTableModel = {
                repesentativeName:key,
                tickets:value
            }
            dashboardDataTable.push(data);
        }
        dashboardDataTable = dashboardDataTable.sort((a,b)=> b.tickets - a.tickets);
        return dashboardDataTable;
    }
    getDataForChart(dashboardData: DashboardModel[]):Array<string|number>[]{
        let chartData:Array<string|number>[] = [];
        let teamvsTicketDic:IterableIterator<[string, number]> = this.getDicForTeamVsTicket(dashboardData).entries();
        for(const [key, value] of  teamvsTicketDic){
            chartData.push([key,value]);
        }
        return chartData;
    }
    private getDicForTeamVsTicket(dashboardData: DashboardModel[]):Map<string, number>{
        let dashboardTableDic = new Map<string, number>();
        let count:number|undefined = 0;
        for(var item of dashboardData){
            if(item.team != null && item.status.toLowerCase().trim() == "open"){
                count = dashboardTableDic.get(item.team);
                if(count == undefined){
                    dashboardTableDic.set(item.team,1);
                } else{
                    dashboardTableDic.set(item.team,count + 1);
                }
                
            }
        }
        return dashboardTableDic;
    }
    private getDicForRepVsTicket(dashboardData: DashboardModel[]):Map<string, number>{
        let dashboardTableDic = new Map<string, number>();
        let count:number|undefined = 0;
        for(var item of dashboardData){
            if(item.supportRep != null){
                count = dashboardTableDic.get(item.supportRep);
                if(count == undefined){
                    dashboardTableDic.set(item.supportRep,1);
                } else{
                    dashboardTableDic.set(item.supportRep,count + 1);
                }
                
            }
        }
        return dashboardTableDic;
    }
    private getOpenTicketsForSingleRep(dashboardData: DashboardModel[],  repName:string):number{
        return dashboardData.filter((val) => val.supportRep?.toLocaleLowerCase().trim() == repName.toLocaleLowerCase().trim()).length;
    }

}