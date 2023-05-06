import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { dataService } from 'src/app/services/dataService.service';
import { EBTService } from 'src/app/services/ebt.service';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  providers: [DatePipe]
})
export class AddComponent implements OnInit {

  errorMessage: string = "";
  success: string = '';
  private subscription!: Subscription;
  PageName: string = ""
  EBTCard: string = ""

  formattedDate = this.datePipe.transform(new Date(), 'MM/dd/yyyy');

  constructor(private ebtService: EBTService,
    private dataService: dataService,
    private datePipe: DatePipe,
    private router: ActivatedRoute) {

  }
  ngOnInit(): void {
    this.router.queryParams.subscribe(params => {
      this.PageName = (params?.['page'] == 'add' ? 'Add EBT Card' : (params?.['page'] == 'verify')? 'Verify EBT Card' : 'Update Nickname')
      this.EBTCard = (params?.['card'] != "" ? params?.['card'] : "")
    })
  }

  onSubmitCard(CardValues: any) {
    if (this.PageName == 'Verify EBT Card') {
      Object.assign(CardValues, { OldEBTCard: this.EBTCard })
    }

    if (this.PageName == 'Update Nickname') {
      Object.assign(CardValues, { EBTCard: this.EBTCard })
    }

    this.dataService.setLoader(true);
    Object.assign(CardValues, { BirthDate: this.datePipe.transform(CardValues.BirthDate, 'MM/dd/yyyy') })
    this.subscription = this.ebtService.CardAccount(CardValues).subscribe({
      next: response => {
        this.dataService.setLoader(false);
        if (response?.Status === 1) {
          if (this.PageName == 'Verify EBT Card'){
            this.success = "Your EBT Card Verified successfuly, Please got to manageEBT account to verify or active the card.";
          }
          if (this.PageName == 'Add EBT Card'){
            this.success = "Your EBT Card has be added to your acccount, Please got to manageEBT account to active the card. ";
          }
          if(this.PageName == 'Update Nickname'){
            this.success = `Your EBT Card ${this.EBTCard} Nickname updated, Please got to manageEBT account to active the card.`;
          }

          CardValues.resetForm();
          
        }
        else {
          this.errorMessage = response?.ServiceResponse[0].Message;
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
    (this.subscription)? this.subscription.unsubscribe() : '';
  }


}
