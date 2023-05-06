import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map, timer, takeWhile, Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/Auth.service';
import { dataService } from 'src/app/services/dataService.service';

@Component({
  selector: 'app-verification-code',
  templateUrl: './verification-code.component.html'
})
export class VerificationCodeComponent implements OnInit {

  EmailID:any | null= null;
  Token:any | null= null;
  time:any;
  disabled:boolean=false;
  PageName:string="Verify Confirmation Code";
  errorMessage:string | null= null;
  success:string | null= null;
  seconds = 10;
  fromPage:string | null= null;
  private subscription!: Subscription;

  constructor(private router:Router,
              private ActRouter: ActivatedRoute,
              private dataService:dataService,
              private authService:AuthService){}

  ngOnInit(): void {
    this.ActRouter.queryParams.subscribe(params => {
      this.PageName = (params?.['page'] == 'forgot' ? 'Verify Confirmation Code' : 'Verify Confirmation Code');
      this.fromPage = (params?.['page'] == 'forgot' ? 'Forgot' : 'Register');
    })
    this.checkValidation();
    this.dataService.setBackButton(true)
  }

  timeRemaining$ = timer(0, 1000).pipe(
    map(n => (this.seconds - n) * 1000),
    takeWhile(n => n >= 0),
  );

  checkValidation(){
    this.EmailID = (sessionStorage.getItem('RegisterEmail')?.toString) ? sessionStorage.getItem('RegisterEmail')?.toString()  : "" ;
    this.Token = (sessionStorage.getItem('Token')?.toString) ? sessionStorage.getItem('Token')?.toString()  : "" ;
    //(this.EmailID) ? this.router.navigate(['/']) : '';

  }

  onSubmitVerify(verify:any){
    Object.assign( verify, { LoginEmail: this.EmailID });
    this.dataService.setLoader(true);
    this.subscription = this.authService.ValidateOTP(verify).subscribe({
      next: response=>{
        if(response.Status === 1) {
          this.dataService.setLoader(false);
          
          if(this.fromPage == 'Register'){
            sessionStorage.setItem('RegisterEmail',verify.LoginEmail);
            this.success = "Confirmation Code is verified and Registration Successful, Redirecting to login page. Please login using your email and password.";
            this.errorMessage="";
            this.dataService.errorredirect()
          }
          else{
            sessionStorage.setItem('Token',response.ServiceResponse[0].Token);
            this.router.navigate(['/ForgotPassword/changePassword']);
          }
          
        }
        else{
          this.dataService.setLoader(false);
          this.success="";
          this.errorMessage = response.ServiceResponse[0].Message;
        }
      },
      error:error =>{
        this.dataService.setLoader(false);
        this.success="";
        this.errorMessage = error.message;
        console.error('There was an error!', error);
      }
    });
  }

  ResendOTP(){
    let OtpData = Object.assign({},{ LoginEmail: this.EmailID, Token: this.Token })
    this.dataService.setLoader(true);
    this.subscription = this.authService.ResendOTP(OtpData).subscribe({
      next: response=>{
        if(response.Status === 1) {
          this.dataService.setLoader(false);
          this.success="A new code was sent to the email address that you provided. Please enter that code to verify your email."
          this.errorMessage="";
        }
        else{
          this.dataService.setLoader(false);
          this.success="";
          this.errorMessage = response.ServiceResponse[0].Message;
        }
      },
      error:error =>{
        this.dataService.setLoader(false);
        this.success="";
        this.errorMessage = error.message;
        console.error('There was an error!', error);
      }
    });
  }

  ngOnDestroy(): void {
    (this.subscription)? this.subscription.unsubscribe() : '';
  }

}
