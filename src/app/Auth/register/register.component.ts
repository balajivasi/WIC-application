import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/Auth.service';
import { dataService } from 'src/app/services/dataService.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html'
})
export class RegisterComponent {

  RegisterForm: FormGroup;
  errorMessage:string | null= null;
  success:string | null= null;
  private subscription!: Subscription;
  error_messages = {
    'LoginEmail': [
      { type: 'required', message: 'Email is required.' },
      { type: 'email', message: 'Valid Email is required.' }
    ],
    'LoginPassword': [
      { type: 'required', message: 'Password is required.' },
      { type: 'minlength', message: 'NewPassword length.' },
      { type: 'maxlength', message: 'NewPassword length.' }
    ],
    'confirmpassword': [
      { type: 'required', message: 'password is required.' },
      { type: 'minlength', message: 'password length.' },
      { type: 'maxlength', message: 'password length.' }
    ],
    'EBTCard': [
      { type: 'required', message: 'EBTCard is required.' },
      { type: 'pattern', message: 'Valid EBTCard reguired.' },
      { type: 'minlength', message: 'Valid EBTCard reguired.' },
      { type: 'maxlength', message: 'Valid EBTCard reguired.' }
    ],
    'BirthDate': [
      { type: 'required', message: 'BirthDate is required.' }
    ],
    'ZipCode': [
      { type: 'required', message: 'Zipcode is required.' },
      { type: 'pattern', message: 'Valid Zipcode length.' }
    ],
    'NickName': [
    ]
  }
  constructor(
    public formBuilder: FormBuilder,
    private dataService:dataService,
    private router:Router,
    private AuthService:AuthService) {

    this.RegisterForm = this.formBuilder.group({
      LoginEmail: new FormControl('', Validators.compose([
        Validators.required,
        Validators.email
      ])),
      LoginPassword: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(30)
      ])),
      confirmpassword: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(30)
      ])),
      EBTCard: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('[0-9]{16}'),
        Validators.minLength(16),
        Validators.maxLength(16)
      ])),
      BirthDate: new FormControl('', Validators.compose([
        Validators.required
      ])),
      ZipCode: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('[0-9]{5}')
      ])),
      NickName: new FormControl('', Validators.compose([
      ])),
    }, { 
      validators: this.password.bind(this)
    });
  }

  ngOnInit(): void {
    this.dataService.setBackButton(true);
  }

  password(formGroup: FormGroup) {
    const LoginPassword = formGroup.get('LoginPassword')?.value;
    const confirmPassword = formGroup.get('confirmpassword')?.value;
    return LoginPassword === confirmPassword ? null : { passwordNotMatch: true };
  }

  Register(register:any){
    delete register.confirmpassword;
    this.subscription = this.AuthService.Register(register).subscribe({
      next: response=>{
        if(response.Status === 1) {
          this.dataService.setLoader(false);
          sessionStorage.setItem('RegisterEmail',register.LoginEmail);
          sessionStorage.setItem('Token',response.ServiceResponse[0].Token)
          this.router.navigate(['/Verification']);
        }
        else{
          this.dataService.setLoader(false);
          this.errorMessage = response.ServiceResponse[0].Message;
        }
      },
      error:error =>{
        this.dataService.setLoader(false);
        this.errorMessage = error.message;
        console.error('There was an error!', error);
      }
    });
  }

  ngOnDestroy(): void {
    (this.subscription)? this.subscription.unsubscribe() : '';
  }
  
}
