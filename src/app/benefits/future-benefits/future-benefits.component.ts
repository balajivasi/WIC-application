import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { BenefitsService } from 'src/app/services/benefits.service';
import { dataService } from 'src/app/services/dataService.service';

@Component({
    selector: 'app-future-benefits',
    templateUrl: './future-benefits.component.html'
})
export class FutureBenefitsComponent implements OnInit {
    
    PageName: string = "Future Benefits";
    private subscription!: Subscription;
    errorMessage:string | null= null;
    success:string | null= null;
    benefitsLists: any = [];
    futureBenefits: any = {};
    noBenefits:boolean=false;
    ContentFile: string | null= null;
    constructor(private benefitsService:BenefitsService,
                private dataService:dataService){

    }

    ngOnInit(): void {
        this.FutureBenefitList()
    }

    FutureBenefitList(){
        this.dataService.setLoader(true);
        this.subscription = this.benefitsService.GetFutureBenefitList().subscribe({
            next: response => {
                if (response.Status === 1) {
                    this.dataService.setLoader(false);
                    if(response.ServiceResponse.length != 0){
                        this.benefitsLists = response.ServiceResponse.sort((a: { IssueMonth: number; }, b: { IssueMonth: number; }) => a.IssueMonth - b.IssueMonth)
                        this.FutureBenefits(this.benefitsLists[0],0)
                    }else{
                        this.noBenefits=true;
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
    FutureBenefits(data:any, index:number){
        this.dataService.setLoader(true);
        this.benefitsLists.forEach((item:any, i:number) => {
            if (i == index) {
              this.benefitsLists[i].class = 'active';
            }
            else {
               this.benefitsLists[i].class = '';
            }
          })

        this.subscription = this.benefitsService.GetFutureBenefits(data).subscribe({
            next: response => {
                if (response.Status === 1) {
                    this.dataService.setLoader(false);
                    this.futureBenefits = response;
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
    lightBox(data: string) {
        console.log('data--', data);
        this.ContentFile = data.replace('content_image.html?image=', '');;
    }
    closeOverlay(){
        this.ContentFile="";
    }
    ngOnDestroy(): void {
        (this.subscription)? this.subscription.unsubscribe() : '';
      }

}
