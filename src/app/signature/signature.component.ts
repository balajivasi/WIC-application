import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Signaturelist } from '../interface/signaturelist';
import { dataService } from '../services/dataService.service';
import { SignatureService } from '../services/signature.service';

@Component({
  selector: 'app-signature',
  templateUrl: './signature.component.html',
  styleUrls: ['./signature.component.css']
})
export class SignatureComponent implements OnInit {
  PageName: string = 'Signature'
  errorMessage:string | null= null;
  private subscription!:Subscription;

  SignDocLists: Array<Signaturelist> =  [];

  constructor(private dataService:dataService,
              private Signature:SignatureService){
                this.dataService.setBackButton(false)
              }
  ngOnInit(): void {
    this.LoadSignDocLists();
  }

  LoadSignDocLists():void{
    this.dataService.setLoader(true);
    this.subscription = this.Signature.LoadSignatureList().subscribe({
      next: response =>{
        if(response.Status === 1) {
          this.dataService.setLoader(false);
          this.SignDocLists = response.ServiceResponse;
        }
        else{
          this.errorMessage = response.ServiceResponse[0].Message;
        }
      },
      error:error=>{
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

