import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { DatePipe } from '@angular/common';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { dataService } from './dataService.service';
import { DeviceDetectorService } from 'ngx-device-detector';
import { LoginUser } from '../interface/login-user';
import { environment } from 'src/environment/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  private readonly apiUrl = environment.API_URL;
  APIToken:string= environment.APIToken;
  loggedIn:BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  isloggedInGuard:boolean=false;
  
  deviceInfo:any = null;
  DeviceType:string = "";
  LoginData:object ={};

  constructor(private http:HttpClient,
              private dataService:dataService,
              private datePipe: DatePipe,
              private deviceService: DeviceDetectorService) {
     //this.DeviceDetails()
  }
  
  DeviceDetails(){
    this.deviceInfo = this.deviceService.getDeviceInfo();    
    this.DeviceType = (this.deviceInfo.deviceType ='desktop') ? '0' : this.deviceInfo.deviceType;
    this.LoginData = {
      "LoginType": "1",
      "APIToken": environment.APIToken,
      "PushToken": "1234",
      "DeviceType": this.DeviceType,
      "OldPushToken": "1",
      "OSVersion": this.deviceInfo.os_version,
      "DeviceModel": this.deviceInfo.device,
      "Version": this.deviceInfo.browser_version
    }

  }

  login(formlogin:any):Observable<LoginUser> {
    this.DeviceDetails();
    const PasswordMD5:object = {LoginPassword:this.dataService.md5(formlogin.LoginPassword)}
    const loginID:object = {LoginID:formlogin.LoginEmail}
    Object.assign(formlogin,this.LoginData,
                  //{"LoginPassword": "UeoJrlixzQP03p3SFMgXFQ=="},
                  PasswordMD5,this.LoginData,loginID
                );

    return this.http.post<LoginUser>(`${this.apiUrl}/Login?print=pretty`, formlogin)
      .pipe(map(response => {
        if (response && response.ServiceResponse[0].Token) {
          sessionStorage.setItem('Token', response.ServiceResponse[0].Token);
          this.dataService.setEBTCard(response.ServiceResponse[0].EBTCardNumber)
          this.loggedIn.next(true)
          this.isloggedInGuard = true;
        }
        return response;
      }));
  }
  isLoggedIn(){
    return this.loggedIn.asObservable()
  }

  getProfile(){
    const Token:string = this.dataService.LoginUserdata.value.Token ? this.dataService.LoginUserdata.value.Token.toString() : sessionStorage.getItem('Token');
    return this.http.post<any>(`${this.apiUrl}/GetBasicFamilyInfo`,{Token,APIToken:this.APIToken}).pipe(map(response =>{
      return response;
    }))
  }

  logout() {
    sessionStorage.removeItem('Token');
    sessionStorage.removeItem('Email');
    sessionStorage.removeItem('userdata');
    this.loggedIn.next(false);
    this.isloggedInGuard = false;
  }

  getToken(): any {
    const currentUser = sessionStorage.getItem('Token');
    return currentUser ? currentUser : '';
  }
  
  Register(register:any){
    this.DeviceDetails();
    Object.assign(register, 
                  this.LoginData, 
                  { LoginPassword: this.dataService.md5(register.LoginPassword),
                    APIToken:this.APIToken,
                    LoginTypeId:register.LoginEmail,
                    BirthDate: this.datePipe.transform(register.BirthDate, 'MM/dd/yyyy')
                  }
                 )
    console.log(register);
    return this.http.post<any>(`${this.apiUrl}/Signup`, register).pipe(map(response => {return response}));
  }

  ValidateOTP(OTPData:any){
    Object.assign(OTPData,{APIToken:this.APIToken})
    return this.http.post<any>(`${this.apiUrl}/ValidateOTP`, OTPData).pipe(map(response => {return response}));
  }
  ResendOTP(data:any){
    Object.assign(data,{APIToken:this.APIToken})
    return this.http.post<any>(`${this.apiUrl}/ResendOTP`, data).pipe(map(response => {return response}));
  }

  ValidateUser(data:any){
    Object.assign(data,{ APIToken:this.APIToken, LoginType:1 })
    return this.http.post<any>(`${this.apiUrl}/ValidateUser`, data).pipe(map(response => {return response}));
  }

}
