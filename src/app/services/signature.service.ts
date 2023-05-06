import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environment/environment';
import { dataService } from './dataService.service';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SignatureService {

  private readonly apiUrl = environment.API_URL;
  Token: string = '';
  APIToken: string

  constructor(private dataService:dataService, private http: HttpClient) {
    this.Token = this.dataService.LoginUserdata.value.Token ? this.dataService.LoginUserdata.value.Token : sessionStorage.getItem('Token');
    this.APIToken = environment.APIToken;
  }

  
  LoadSignatureList(){
    const Options = {
      "APIToken": this.APIToken,
      "Token": this.Token,
      "Language":'en'
    }
    return this.http.post<any>(`${this.apiUrl}/GetSignaturesList`, Options).pipe(map(response => {
      return response;
    }))
  }
  LoadSignatureDoc(data:any){
    
    const Options = {
      "APIToken": this.APIToken,
      "Token": this.Token,
      "Language":'en',
      "SignDocID": data.SignDocID,
      "CLDDocID": data.CLDDocID
    }
    return this.http.post<any>(`${this.apiUrl}/GetSignatureDoc`, Options).pipe(map(response => {
      return response;
    }))
  }

  SaveSignature(data:any){
    const Options = Object.assign(data,{
      "APIToken": this.APIToken,
      "Token": this.Token,
      "Language":'en'
    })
    return this.http.post<any>(`${this.apiUrl}/MobileSignature`, Options).pipe(map(response => {
      return response;
    }))
  }
  

}
