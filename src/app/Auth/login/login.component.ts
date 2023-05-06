import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/Auth.service';
import { dataService } from 'src/app/services/dataService.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit, OnDestroy {
  deviceInfo: any = null;
  DeviceType: string = "";
  LoginData: object = {};
  errorMessage:string | null= null;
  success:string | null= null;

  private subscription!: Subscription;

  constructor(private AuthService: AuthService,
    private dataService: dataService,
    private router: Router) {
  }

  ngOnInit(): void {
    this.dataService.setBackButton(false);
    this.AuthService.logout()
  }

  onSubmitLogin(formVal: any) {
    this.dataService.setLoader(true);
    this.subscription = this.AuthService.login(formVal).subscribe({

      next: response => {
        this.dataService.setLoader(false);
        if (response.Status === 1) {
          sessionStorage.setItem('Email', formVal.LoginEmail);
          this.router.navigate(['/']);
          this.dataService.setBackButton(false);
          this.dataService.setUserData(response);
        } else {
          this.errorMessage = response.ServiceResponse[0].Message;
          this.AuthService.logout()
        }

      },
      error: error => {
        this.dataService.setLoader(false);
        this.errorMessage = error.message;
        console.error('There was an error!', error);
      }
    })
  }

  ngOnDestroy(): void {
    (this.subscription) ? this.subscription.unsubscribe() : '';
  }

}
