import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { BenefitsService } from '../services/benefits.service';
import { dataService } from '../services/dataService.service';

@Component({
    selector: 'app-benefits',
    templateUrl: './benefits.component.html'
})
export class BenefitsComponent implements OnInit {

    PageName: string = "Current Benefits";
    private subscription!: Subscription;
    errorMessage:string | null= null;
    success:string | null= null;
    noBenefits: boolean = false;
    ContentFile: string = "";
    
    constructor(private dataService: dataService,
        private benefitsService: BenefitsService) {

    }
    Benefits: any = {};
    ngOnInit(): void {
        this.loadCurrentBenefits()
    }
    loadCurrentBenefits() {
        this.dataService.setLoader(true);
        this.subscription = this.benefitsService.getCurrentBenefits().subscribe({
            next: response => {
                if (response.Status === 1) {
                    this.dataService.setLoader(false);
                    if (response.ServiceResponse.length != 0) {
                        this.Benefits = response.ServiceResponse;
                    } else {
                        this.noBenefits = true;
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
    lightBox(data: string) {
        console.log('data--', data);
        this.ContentFile = data.replace('content_image.html?image=', '');;
    }
    closeOverlay(){
        this.ContentFile="";
    }
    ngOnDestroy(): void {
        (this.subscription) ? this.subscription.unsubscribe() : '';
    }

}
