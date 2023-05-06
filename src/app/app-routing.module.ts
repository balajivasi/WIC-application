import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppointmentsComponent } from './Contacts/appointments/appointments.component';
import { BenefitsComponent } from './benefits/benefits.component';
import { ChangePasswordComponent } from './Auth/change-password/change-password.component';
import { ClinicComponent } from './Location/clinic/clinic.component';
import { FeedbackComponent } from './Contacts/feedback/feedback.component';
import { ForgotPasswordComponent } from './Auth/forgot-password/forgot-password.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './Auth/login/login.component';
import { AddComponent } from './manage-ebtaccount/add/add.component';
import { ManageEBTAccountComponent } from './manage-ebtaccount/manage-ebtaccount.component';
import { NotificationsComponent } from './Contacts/notifications/notifications.component';
import { Page404Component } from './page404/page404.component';
import { RegisterComponent } from './Auth/register/register.component';
import { ResourceLinkComponent } from './Contacts/resource-link/resource-link.component';
import { AuthGuard } from './services/auth.guard';
import { StoresComponent } from './Location/stores/stores.component';
import { UPCScanComponent } from './upcscan/upcscan.component';
import { UploadDocumentsComponent } from './upload-documents/upload-documents.component';
import { VerificationCodeComponent } from './Auth/verification-code/verification-code.component';
import { ForgotChangePasswordComponent } from './Auth/forgot-password/forgot-change-password/forgot-change-password.component';
import { FutureBenefitsComponent } from './benefits/future-benefits/future-benefits.component';
import { SignatureComponent } from './signature/signature.component';
import { SignatureDetailsComponent } from './signature/signature-details/signature-details.component';

const routes: Routes = [
  { path:'', component:HomeComponent, canActivate:[AuthGuard] },
  { path:'login',component:LoginComponent },
  { path:'ManageEBTAccount', component:ManageEBTAccountComponent, canActivate:[AuthGuard] },
  { path:'ManageEBTAccount/Cards', component:AddComponent, canActivate:[AuthGuard] },
  { path:'Appointments', component:AppointmentsComponent, canActivate:[AuthGuard]  },
  { path:'Benefits', component:BenefitsComponent, canActivate:[AuthGuard] },
  { path:'Future', component:FutureBenefitsComponent, canActivate:[AuthGuard] },
  { path:'Clinic', component:ClinicComponent },
  { path:'Stores', component:StoresComponent },
  { path:'ChangePassword', component:ChangePasswordComponent, canActivate:[AuthGuard] },
  { path:'Feedback', component:FeedbackComponent, canActivate:[AuthGuard] },
  { path:'UploadDocuments', component:UploadDocumentsComponent, canActivate:[AuthGuard] },
  { path:'ResourceLink', component:ResourceLinkComponent },
  { path:'UPCScan', component:UPCScanComponent },
  { path:'notification', component:NotificationsComponent, canActivate:[AuthGuard] },
  { path:'ForgotPassword', component:ForgotPasswordComponent},
  { path:'ForgotPassword/changePassword', component:ForgotChangePasswordComponent},
  { path:'Register', component:RegisterComponent },
  { path:'Signature',component:SignatureComponent, canActivate:[AuthGuard]  },
  { path:'Signature/:SignDocID/:CLDDocID',component:SignatureDetailsComponent, canActivate:[AuthGuard]  },
  { path:'Verification', component:VerificationCodeComponent },
  { path:'**', component: Page404Component }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
