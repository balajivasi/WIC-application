import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { environment } from '../../environment/environment';
import { dataService } from './dataService.service';

@Injectable({
  providedIn: 'root'
})
export class LocationService {
  private readonly apiUrl = environment.API_URL;
  Token: string = '';
  language: string = '';
  constructor(private dataService: dataService, private http: HttpClient) {
    this.Token = this.dataService.LoginUserdata.value.Token ? this.dataService.LoginUserdata.value.Token : sessionStorage.getItem('Token');
    this.language = this.dataService.Language
  }

  ClinicLocations(location: any) {
    const APIToken: string = environment.APIToken;
    let Options = Object.assign({
      "Lat":location.lat,
      "Lng":location.lng,
      "Distance": location.Distance,
      APIToken,
      Token: this.Token
    })
    return this.http.post<any>(`${this.apiUrl}/GetNearbyClinics`, Options).pipe(map(response => { return response }))
  }

  StoresLocations(location: any) {
    const APIToken: string = environment.APIToken;
    let Options = Object.assign({
      "Lat":location.lat,
      "Lng":location.lng,
      "Distance": location.Distance,
      APIToken,
      Token: this.Token
    })
    return this.http.post<any>(`${this.apiUrl}/GetNearbyAuthorizedStores`, Options).pipe(map(response => { return response }))
  }

  getLocation(term: string): Observable<GeocoderResponse> {
    const url = `https://maps.google.com/maps/api/geocode/json?address=${term}&sensor=false&key=${environment.googleApiKey}`;
    return this.http.get<GeocoderResponse>(url);
  }
}

export class GeocoderResponse {
  status: string;
  error_message: string | undefined;
  results: google.maps.GeocoderResult[];

  constructor(status: string, results: google.maps.GeocoderResult[]) {
    this.status = status;
    this.results = results;
  }
}