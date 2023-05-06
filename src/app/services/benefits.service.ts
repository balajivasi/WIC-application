import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environment/environment';
import { dataService } from './dataService.service';
import { map } from 'rxjs';
import { data } from 'jquery';

@Injectable({
  providedIn: 'root'
})
export class BenefitsService {

  private readonly apiUrl = environment.API_URL;
  Token: string = '';
  APIToken: string

  constructor(private dataService: dataService, private http: HttpClient) {
    this.Token = this.dataService.LoginUserdata.value.Token ? this.dataService.LoginUserdata.value.Token : sessionStorage.getItem('Token');
    this.APIToken = environment.APIToken;
  }

  getCurrentBenefits(){
    const now = new Date();
    const month = `${now.getMonth()}`.padStart(2, '0');
    const year = now.getFullYear(); 
    const EffDateCode = `${year}${month}`
    let Options = Object.assign({ "APIToken": this.APIToken, "Token": this.Token, EffDateCode })
    return this.http.post<any>(`${this.apiUrl}/GetCurrentBenefits`, Options).pipe(map(response => {
      return response;
    }))
  }

  GetFutureBenefitList(){
    let Options = Object.assign({ "APIToken": this.APIToken, "Token": this.Token})
    return this.http.post<any>(`${this.apiUrl}/GetFutureBenefitList`, Options).pipe(map(response => {
      return response;
    }))
  }

  GetFutureBenefits(options:object){
    let Options = Object.assign(options,{ "APIToken": this.APIToken, "Token": this.Token})
    return this.http.post<any>(`${this.apiUrl}/GetFutureBenefits`, Options).pipe(map(response => {
      return response;
    }))
  }

}
