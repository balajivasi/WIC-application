import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root'
})
export class dataService {

  constructor(private http:HttpClient,private router:Router) { }
  
  private showbutton = new BehaviorSubject<boolean>(false);
  loader = new BehaviorSubject<boolean>(false);
  LoginUserdata = new BehaviorSubject<any>("");
  currentGlobalValue = this.showbutton.asObservable();
  EBTCard=new BehaviorSubject<string>('');
  Language:string='en';
  notificationsCount=new BehaviorSubject<number>(0);
  
  setBackButton(newValue: boolean){
    this.showbutton.next(newValue);
  }
 
  setLoader(newValue: boolean){
    this.loader.next(newValue);
  }
  setUserData(userData:any){
    const data:object = Object.assign(this.LoginUserdata.value,userData.ServiceResponse[0])
    sessionStorage.setItem('userdata',JSON.stringify(userData.ServiceResponse));
    this.LoginUserdata.next(data);
  }
  setEBTCard(newValue: string){
    this.EBTCard.next(newValue);;
  }
  errorredirect(){
    setTimeout(() => {
      this.router.navigate(['/login']);
  }, 5000);
  }

  md5(password:string) {
    let hash = CryptoJS.MD5(password);
    return btoa(hash.toString(CryptoJS.enc.Hex));
  }

}
