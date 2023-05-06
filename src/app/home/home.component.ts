import { Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../services/Auth.service';
import { dataService } from '../services/dataService.service';
import { WicService } from '../services/wic.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls:['home.component.css']
})
export class HomeComponent implements OnInit {

  LoginUserdata:any="";
  errorMessage:string="";
  appointmnets:Date =new Date();
  private subscription!: Subscription;
  notificationsCount:number=0;
  
  constructor(private authService:AuthService,
              private router:Router,
              private dataService:dataService,
              private WicService:WicService){
    //this.LoginUserdata= this.authService.LoginUserdata;
  }
  status: boolean = false;
  clickEvent(){
      this.status = !this.status;       
  }
  ngOnInit():void {
    this.PageLoad();
  }

  PageLoad():void{
    this.dataService.setLoader(true);
    this.subscription = this.authService.getProfile().subscribe({
      next: response =>{
        if(response.Status === 1) {
          this.dataService.setLoader(false);
          this.LoginUserdata = response.ServiceResponse[0];
          this.dataService.setUserData(response);
        }
        else{
          this.errorMessage = response.ServiceResponse[0].Message;
        }
      },
      error:error=>{
        this.dataService.setLoader(false);
        this.errorMessage = error.message;
        console.error('There was an error!', error);
      }
    })

    this.subscription = this.WicService.Notifications().subscribe({
      next: response=>{
        if(response.Status === 1) {
          this.dataService.setLoader(false);
          this.notificationsCount= response.ServiceResponse.length;
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

  logout(){
    this.authService.logout();
    this.router.navigate(['/login'])
  }

}
