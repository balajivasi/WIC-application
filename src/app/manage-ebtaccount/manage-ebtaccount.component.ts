import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { dataService } from '../services/dataService.service';
import { EBTService } from '../services/ebt.service';
import { BehaviorSubject, Subscription } from 'rxjs';

@Component({
  selector: 'app-manage-ebtaccount',
  templateUrl: './manage-ebtaccount.component.html'
})
export class ManageEBTAccountComponent implements OnInit {

  EBTAccounts:any ={};
  errorMessage:string="";
  EBTCard:any="";
  PageName:string="Manage EBT Cards";
  removeCardMessage:boolean=false;
  CardDefaultMessage:boolean=false;
  private subscription!: Subscription;
  
  constructor(private ebtService:EBTService,private dataService:dataService,private router:Router){

  }

  ngOnInit(): void {
    this.EBTCard = this.dataService.EBTCard.value;
    this.LoadEBTCards()
  }

  LoadEBTCards(){
    this.dataService.setLoader(true);
    this.subscription = this.ebtService.getAllAccounts().subscribe({
      next:response =>{
        if(response.Status === 1) {
          this.dataService.setLoader(false);
          this.EBTAccounts=response;
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
  selectAccount(ebtcard:string){
    this.dataService.setLoader(true);
    this.subscription = this.ebtService.selectCard(ebtcard).subscribe({
      next:response =>{
        if(response.Status === 1) {
          this.dataService.setLoader(false);
          this.dataService.setEBTCard(ebtcard)
          this.router.navigate(['/']);
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
    })
  }

  ManageAccount(card:string,value:string){
    const Id = (value == 'remove'? 1 : 0);
    
    this.dataService.setLoader(true);
    this.subscription = this.ebtService.ManageAccount(card,Id).subscribe({
      next:response =>{
        if(response.Status === 1) {
          this.LoadEBTCards();
          this.dataService.setLoader(false);
          if(value == 'remove' ){
            this.removeCardMessage = true;
            this.CardDefaultMessage = false;
          } else{
            this.removeCardMessage = false;
            this.CardDefaultMessage = true;
          }

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
    })
  }

  ngOnDestroy(): void {
    (this.subscription)? this.subscription.unsubscribe() : '';
  }

}
