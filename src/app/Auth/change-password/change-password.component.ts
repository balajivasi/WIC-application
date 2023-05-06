import { Component, OnDestroy } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { dataService } from 'src/app/services/dataService.service';
import { WicService } from 'src/app/services/wic.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html'
})
export class ChangePasswordComponent implements OnDestroy {

  loginForm: FormGroup;
  private subscription!: Subscription;
  errorMessage:string | null= null;
  success:string | null= null;
  PageName:string="Change Password";
  error_messages = {
   
    'OldPassword': [
      { type: 'required', message: 'password is required.' },
      { type: 'minlength', message: 'password length.' },
      { type: 'maxlength', message: 'password length.' }
    ],
    'NewPassword': [
      { type: 'required', message: 'NewPassword is required.' },
      { type: 'minlength', message: 'NewPassword length.' },
      { type: 'maxlength', message: 'NewPassword length.' }
    ],
    'confirmpassword': [
      { type: 'required', message: 'password is required.' },
      { type: 'minlength', message: 'password length.' },
      { type: 'maxlength', message: 'password length.' }
    ],
  }
error: any;

  constructor(
    public formBuilder: FormBuilder,
    private wicService:WicService,
    private dataService:dataService
  ) {
    this.loginForm = this.formBuilder.group({
      OldPassword: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(30)
      ])),
      NewPassword: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(30)
      ])),
      confirmpassword: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(30)
      ])),
    }, { 
      validators: this.password.bind(this)
    });

    
  }

  password(formGroup: FormGroup) {
    const NewPassword = formGroup.get('NewPassword')?.value;
    const confirmPassword = formGroup.get('confirmpassword')?.value;
    return NewPassword === confirmPassword ? null : { passwordNotMatch: true };
  }

  PasswordChange(formdata:any){
    delete formdata.confirmpassword;
    Object.assign(formdata, { OldPassword: this.dataService.md5(formdata.OldPassword)})
    Object.assign(formdata, { NewPassword: this.dataService.md5(formdata.NewPassword)})


    this.subscription = this.wicService.UpdatePassword(formdata).subscribe({
      next:response =>{
        if(response.Status === 1) {
          this.dataService.setLoader(false);
          console.log(response)
        }
        else{
          this.dataService.setLoader(false);
          this.errorMessage = response.ServiceResponse[0].Message;
          this.dataService.errorredirect()
        }
        
      },
      error:error =>{
        this.dataService.setLoader(false);
        this.errorMessage = error.message;
        console.error('There was an error!', error);
      }
    })
  }

  ngOnDestroy(): void {
    (this.subscription)? this.subscription.unsubscribe() : '';
  }

}
