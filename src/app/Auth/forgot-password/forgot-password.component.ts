import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { DatePipe } from '@angular/common';
import { AuthService } from 'src/app/services/Auth.service';
import { Router } from '@angular/router';
import { dataService } from 'src/app/services/dataService.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html'
})
export class ForgotPasswordComponent implements OnInit,OnDestroy {

  PageName:string="Forgot password";
  errorMessage:string | null= null;
  success:string | null= null;
  Question:number= 0;

  private subscription!: Subscription;
  formattedDate = this.datePipe.transform(new Date(), 'MM/dd/yyyy');


  constructor(private dataService:dataService,
              private datePipe: DatePipe,
              private router:Router,
              private authService:AuthService){
    
  }
  ngOnInit(): void {
    this.Question = this.getRandomInt(3);
    ( sessionStorage.getItem('Token') ) ? this.dataService.setBackButton(false) : this.dataService.setBackButton(true);
  }

  onSubmitForgot(forgotData:any){
    Object.assign(forgotData, { BirthDate: this.datePipe.transform(forgotData.BirthDate, 'MM/dd/yyyy') })
    this.dataService.setLoader(true);
    this.subscription = this.authService.ValidateUser(forgotData).subscribe({
      next: response=>{
        if(response.Status === 1) {
          this.dataService.setLoader(false);
          sessionStorage.setItem('RegisterEmail',forgotData.LoginEmail);
          this.router.navigate(['/Verification'],{ queryParams: { page: 'forgot' } });
        }
        else{
          this.dataService.setLoader(false);
          this.success="";
          this.errorMessage = response.ServiceResponse[0].Message;
        }
      },
      error:error =>{
        this.dataService.setLoader(false);
        this.success="";
        this.errorMessage = error.message;
        console.error('There was an error!', error);
      }
    });
    console.log(forgotData)
  }
  getRandomInt(max:number) {
    return Math.floor(Math.random() * max);
  }
  ngOnDestroy(): void {
    (this.subscription)? this.subscription.unsubscribe() : '';
  }
  
}
