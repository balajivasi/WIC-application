import { Component, OnInit, ViewChild } from '@angular/core';
import { dataService } from '../../services/dataService.service';
import { MapInfoWindow, MapMarker } from '@angular/google-maps';
import { Observable, Subscription, map } from 'rxjs';
import { GeocoderResponse, LocationService } from 'src/app/services/location.service';
import { Locations } from 'src/app/interface/locations';

@Component({
  selector: 'app-clinic',
  templateUrl: './clinic.component.html'
})
export class ClinicComponent implements OnInit {

  PageName: string = "Clinic";
  errorMessage: string | null = null;
  success: string | null = null;
  center: any = {
    lat: 30.446423,
    lng: -84.282943
  };
  private subscription!: Subscription;
  mapOptions: google.maps.MapOptions = {
    mapTypeId: 'hybrid',
    zoomControl: true,
    scrollwheel: false,
    disableDoubleClickZoom: true,
    maxZoom: 15,
    minZoom: 3,
    zoom:13
  };
  markerPositions: Locations[] = []
  miles:number=5;
  map: undefined;
  constructor(private dataService: dataService,
    private clincService: LocationService) { }

  @ViewChild(MapInfoWindow) infoWindow: MapInfoWindow | undefined;


  ngOnInit(): void {
    (sessionStorage.getItem('Token')) ? this.dataService.setBackButton(false) : this.dataService.setBackButton(true);

    navigator.geolocation.getCurrentPosition((_position) => {
      this.center = {
        lat: _position.coords.latitude,
        lng: _position.coords.longitude,
      };
      this.loadclinics(this.center)
    });

  }

  getMilesData(){
    this.loadclinics(this.center)
  }
  getGeoLocation(address:string) {
    if (!address || address.length === 0) {
      return;
    }
  
    this.clincService
      .getLocation(address)
      .subscribe(
        (response: GeocoderResponse) => {
          console.log(response)
          if (response.status === 'OK' && response.results?.length) {
            const location = response.results[0];
            this.center = location.geometry.location;
            
            this.loadclinics(location.geometry.location)
          }
          }
      )
  }

  loadclinics(locations: object) {
    Object.assign(locations,{"Distance": this.miles})

    this.dataService.setLoader(true);
    this.subscription = this.clincService.ClinicLocations(locations).subscribe({
      next: response => {
        if (response.Status === 1) {
          this.dataService.setLoader(false);
          if (response.ServiceResponse.length != 0) {
            this.markerPositions = response.ServiceResponse.map((item: { [x: string]: any; Latitude: any; Longitude: any; }) => {
              const { Latitude, Longitude, ...rest } = item;
              return {
                ...rest,
                location: {
                  lat: parseFloat(Latitude),
                  lng: parseFloat(Longitude)
                }
              };
            });
          }
        }
        else {
          this.dataService.setLoader(false);
          this.errorMessage = response.ServiceResponse[0].Message;
          this.dataService.errorredirect();
        }
      },
      error: error => {
        this.dataService.setLoader(false);
        this.errorMessage = error.message;
        console.error('There was an error!', error);
      }
    });
  }

  
  

  openInfoWindow(marker: MapMarker) {
    this.infoWindow?.open(marker);
  }

  ngOnDestroy(): void {
    (this.subscription) ? this.subscription.unsubscribe() : '';
  }

}

