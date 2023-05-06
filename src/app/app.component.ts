import { Location } from '@angular/common';
import { Component,OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable , BehaviorSubject} from 'rxjs';
import { AuthService } from './services/Auth.service';
import { dataService } from './services/dataService.service';
import pkg from '../../package.json';
import { navigate } from './app.navigation'
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit{
  title:string = pkg.name;
  version:string= pkg.version
  status: boolean = false;
  BackButton$:boolean = false;
  isLoggedIn$:Observable<boolean> = new BehaviorSubject(false);
  Navigate:any = [];
  Email$: BehaviorSubject<string> = new BehaviorSubject<string>(sessionStorage.getItem('Email') || '');
  loadingStatus$:boolean=false;
  userName:any="";
  

  constructor(private AuthService:AuthService,
              private router:Router,
              private location:Location,
              private dataService:dataService){}

  ngOnInit():void{
    this.isLoggedIn$ = this.AuthService.isLoggedIn();
    this.Navigate = navigate;
    this.dataService.currentGlobalValue.subscribe(value => {
      this.BackButton$ = value;
    });
    this.dataService.LoginUserdata.subscribe(value =>{
      value ? this.userName = value : ''
    })
    this.dataService.loader.subscribe(Value =>{
      this.loadingStatus$ = Value;
    })
   
    
  }
  logout(){
    this.AuthService.logout();
    this.router.navigate(['/login'])
  }
  clickEvent(){
      this.status = !this.status;       
  }
  menuClose(){
    this.status = (this.status) ? !this.status : this.status;
  }
  back(){
    this.location.back()
  }
}
