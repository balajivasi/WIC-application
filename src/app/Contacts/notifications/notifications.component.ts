import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { dataService } from '../../services/dataService.service';
import { WicService } from '../../services/wic.service';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html'
})
export class NotificationsComponent implements OnInit {

  EBTCard:any="";
  errorMessage:string="";
  PageName:string="Notifications";
  notifications:Array<INotifications> =[];
  private subscription!: Subscription;
  constructor(private dataService:dataService,private WicService:WicService){}

  ngOnInit(): void {
    this.dataService.setLoader(true);
    this.EBTCard = this.dataService.EBTCard.value;
    this.subscription = this.WicService.Notifications().subscribe({
      next: response=>{
        if(response.Status === 1) {
          this.dataService.setLoader(false);
          this.notifications=response.ServiceResponse;
        }
        else{
          this.dataService.setLoader(false);
          this.errorMessage = response.ServiceResponse[0].Message;
          this.dataService.errorredirect()
        }
      },
      error:error =>{
        this.dataService.setLoader(false);
        this.errorMessage = error.message;
        console.error('There was an error!', error);
      }
    });
  }
  ngOnDestroy(): void {
    (this.subscription)? this.subscription.unsubscribe() : '';
  }
  
}

export interface INotifications {
  Message:String
}