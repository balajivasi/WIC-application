import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { environment } from '../../environment/environment';
import { dataService } from './dataService.service';

@Injectable({
  providedIn: 'root'
})
export class WicService {

  private readonly apiUrl = environment.API_URL;
  Token: string = '';
  language: string = '';
  constructor(private dataService: dataService, private http: HttpClient) {
    this.Token = this.dataService.LoginUserdata.value.Token ? this.dataService.LoginUserdata.value.Token : sessionStorage.getItem('Token');
    this.language = this.dataService.Language
  }

  Notifications() {
    const APIToken: string = environment.APIToken;

    return this.http.post<any>(`${this.apiUrl}/GetBroadcastMsgs`,
      {
        APIToken,
        Token: this.Token,
        Language: this.language
      }
    ).pipe(map(response => { return response }))
  }

  UpdateFeedback(feedbackData: any) {
    const APIToken: string = environment.APIToken;
    Object.assign(feedbackData, {
      APIToken,
      Token: this.Token,
      Language: this.language
    })
    return this.http.post<any>(`${this.apiUrl}/UpdateFeedback`, feedbackData).pipe(map(response => { return response }))

  }

  UpdatePassword(updatePassword:any){
    const APIToken: string = environment.APIToken;
    Object.assign(updatePassword, {
      APIToken,
      Token: this.Token
    })
    return this.http.post<any>(`${this.apiUrl}/ChangePassword`, updatePassword).pipe(map(response => {return response}))
  }


}
