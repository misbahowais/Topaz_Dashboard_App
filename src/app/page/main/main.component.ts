import { Component } from '@angular/core';
import { ChatsComponent } from '../../components/chats/chats.component';
import { DashboardComponent } from '../dashboard/dashboard.component';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [DashboardComponent,ChatsComponent],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})
export class MainComponent {

}
