import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { dataService } from 'src/app/services/dataService.service';
import { SignatureService } from 'src/app/services/signature.service';
import SignaturePad from 'signature_pad';

@Component({
  selector: 'app-signature-details',
  templateUrl: './signature-details.component.html',
  styleUrls: ['./signature-details.component.css']
})
export class SignatureDetailsComponent implements OnInit {

  SignDocID: string | null = null;
  CLDDocID: string | null = null;
  private subscription!: Subscription;
  errorMessage: string | null = null;
  PageData:any=""

  signPad: any;
  @ViewChild('signPadCanvas', {static: false}) signaturePadElement:any;
  signImage:any;

  constructor(private dataService: dataService,
    private route: ActivatedRoute,
    private Signature: SignatureService) {
    this.dataService.setBackButton(true)
  }

  ngOnInit(): void {
    this.SignDocID = this.route.snapshot.paramMap.get('SignDocID');
    this.CLDDocID = this.route.snapshot.paramMap.get('CLDDocID');
    this.LoadSignDoc();
  }
  ngAfterViewInit() {
    this.signPad = new SignaturePad(this.signaturePadElement.nativeElement);
  }
  /*It's work in devices*/
  startSignPadDrawing(event: Event) {
    console.log(event);
  }
  /*It's work in devices*/
  movedFinger(event: Event) {
  }
  /*Undo last step from the signature*/
  undoSign() {
    const data = this.signPad.toData();
    if (data) {
      data.pop(); // remove the last step
      this.signPad.fromData(data);
    }
  }
  /*Clean whole the signature*/
  clearSignPad() {
    this.signPad.clear();
  }
  /*Here you can save the signature as a Image*/
  saveSignPad() {
    const base64ImageData = this.signPad.toDataURL();
    this.signImage = base64ImageData.replace('data:image/png;base64,','');
    let data={
      "SignDocID": this.SignDocID,
      "CLDDocID": this.CLDDocID,
      "FileType":'png',
      "SignDoc":this.signImage
    }
    //Here you can save your signature image using your API call.
    this.subscription = this.Signature.SaveSignature(data).subscribe({
      next: response => {
        if (response.Status === 1) {
          this.dataService.setLoader(false);
          this.PageData = response.ServiceResponse[0];
          //this.SignDocLists = response.ServiceResponse;
        }
        else {
          this.errorMessage = response.ServiceResponse[0].Message;
        }
      },
      error: error => {
        this.dataService.setLoader(false);
        this.errorMessage = error.message;
        console.error('There was an error!', error);
      }
    })
  }

  LoadSignDoc(): void {
    let data = {
      "SignDocID": this.SignDocID,
      "CLDDocID": this.CLDDocID
    }
    this.dataService.setLoader(true);
    this.subscription = this.Signature.LoadSignatureDoc(data).subscribe({
      next: response => {
        if (response.Status === 1) {
          this.dataService.setLoader(false);
          this.PageData = response.ServiceResponse[0];
          //this.SignDocLists = response.ServiceResponse;
        }
        else {
          this.errorMessage = response.ServiceResponse[0].Message;
        }
      },
      error: error => {
        this.dataService.setLoader(false);
        this.errorMessage = error.message;
        console.error('There was an error!', error);
      }
    })
  }


}
