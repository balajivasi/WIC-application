import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environment/environment';
import { dataService } from './dataService.service';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EBTService {

  private readonly apiUrl = environment.API_URL;
  Token: string = '';
  APIToken: string

  constructor(private dataService: dataService, private http: HttpClient) {
    this.Token = this.dataService.LoginUserdata.value.Token ? this.dataService.LoginUserdata.value.Token : sessionStorage.getItem('Token');
    this.APIToken = environment.APIToken;
  }

  getAllAccounts() {

    return this.http.post<any>(`${this.apiUrl}/AllAccounts`, { APIToken: this.APIToken, Token: this.Token }).pipe(map(response => {
      return response;
    }))
  }
  selectCard(card: string) {
    const EBTCard: string = card;
    return this.http.post<any>(`${this.apiUrl}/SelectAccount`, { APIToken: this.APIToken, Token: this.Token, EBTCard }).pipe(map(response => {
      return response;
    }))
  }

  ManageAccount(card: string, ID: number) {

    const Options = {
      "EBTCard": card,
      "APIToken": this.APIToken,
      "Token": this.Token,
      "Remove": (ID == 1 ? 1 : 0),
      "AddDefault": (ID == 0 ? 1 : 0)
    }
    return this.http.post<any>(`${this.apiUrl}/ManageAccount`, Options).pipe(map(response => {
      return response;
    }))
  }

  CardAccount(Options: any) {
    const OldEBTCard = Options.OldEBTCard;
    const BirthDate = Options.BirthDate;
    let ServiceURL =  (BirthDate == null) ? `${this.apiUrl}/UpdateNickName` :  (OldEBTCard != undefined) ? `${this.apiUrl}/VerifyAccount` : `${this.apiUrl}/AddAccount`;

    Options = Object.assign(Options, { "APIToken": this.APIToken, "Token": this.Token })
    return this.http.post<any>(ServiceURL, Options).pipe(map(response => {
      return response;
    }))

  }
}

export interface IaddService {
  "EBTCard": number,
  "BirthDate": Date,
  "ZipCode": null,
  "NickName": string,
  "APIToken": string,
  "Token": string
}