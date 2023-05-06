import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'
import { FormsModule,ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './Auth/login/login.component';
import { DeviceDetectorService } from 'ngx-device-detector';
import { ManageEBTAccountComponent } from './manage-ebtaccount/manage-ebtaccount.component';
import { AppointmentsComponent } from './Contacts/appointments/appointments.component';
import { BenefitsComponent } from './benefits/benefits.component';
import { ClinicComponent } from './Location/clinic/clinic.component';
import { StoresComponent } from './Location/stores/stores.component';
import { ChangePasswordComponent } from './Auth/change-password/change-password.component';
import { FeedbackComponent } from './Contacts/feedback/feedback.component';
import { ResourceLinkComponent } from './Contacts/resource-link/resource-link.component';
import { UploadDocumentsComponent } from './upload-documents/upload-documents.component';
import { UPCScanComponent } from './upcscan/upcscan.component';
import { NotificationsComponent } from './Contacts/notifications/notifications.component';
import { Page404Component } from './page404/page404.component';
import { AddComponent } from './manage-ebtaccount/add/add.component';
import { RegisterComponent } from './Auth/register/register.component';
import { ForgotPasswordComponent } from './Auth/forgot-password/forgot-password.component';
import { DatePipe } from '@angular/common';
import { VerificationCodeComponent } from './Auth/verification-code/verification-code.component';
import { ForgotChangePasswordComponent } from './Auth/forgot-password/forgot-change-password/forgot-change-password.component';
import { FutureBenefitsComponent } from './benefits/future-benefits/future-benefits.component';
import { LightBoxComponent } from './light-box/light-box.component';
import { GoogleMapsModule } from '@angular/google-maps';
import { SignatureComponent } from './signature/signature.component';
import { SignatureDetailsComponent } from './signature/signature-details/signature-details.component'

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    ManageEBTAccountComponent,
    AppointmentsComponent,
    BenefitsComponent,
    ClinicComponent,
    StoresComponent,
    ChangePasswordComponent,
    FeedbackComponent,
    ResourceLinkComponent,
    UploadDocumentsComponent,
    UPCScanComponent,
    NotificationsComponent,
    Page404Component,
    AddComponent,
    RegisterComponent,
    ForgotPasswordComponent,
    VerificationCodeComponent,
    ForgotChangePasswordComponent,
    FutureBenefitsComponent,
    LightBoxComponent,
    SignatureComponent,
    SignatureDetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    GoogleMapsModule
  ],
  providers: [DeviceDetectorService,DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
