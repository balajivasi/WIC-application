import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { dataService } from '../../services/dataService.service';
import { WicService } from '../../services/wic.service';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html'
})
export class FeedbackComponent {

  errorMessage:string="";
  success:string="";
  PageName:string="Feedback";
  private subscription!: Subscription;
  
  constructor(private WicService:WicService,private dataService:dataService){

  }

  onSubmitFeedback(feedback:NgForm){
    this.dataService.setLoader(true);
    this.subscription = this.WicService.UpdateFeedback(feedback).subscribe({
      next: response => {
        this.dataService.setLoader(false);
        if (response?.Status === 1) {
          this.success = response?.ServiceResponse[0].Message;
          
        }
        else {
          this.errorMessage = response?.ServiceResponse[0].Message;
        }
      },
      error: error => {
        this.dataService.setLoader(false);
        this.errorMessage = error.message;
        console.error('There was an error!', error);
      }
    })
  }

  ngOnDestroy(): void {
    (this.subscription)? this.subscription.unsubscribe() : '';
  }

}
