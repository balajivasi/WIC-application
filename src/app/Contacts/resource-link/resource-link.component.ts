import { Component } from '@angular/core';
import { dataService } from '../../services/dataService.service';

@Component({
  selector: 'app-resource-link',
  templateUrl: './resource-link.component.html'
})
export class ResourceLinkComponent {
  PageName:string="WIC Resources"
  constructor(private dataservice:dataService){}
  ngOnInit(): void {
    ( sessionStorage.getItem('Token') ) ? this.dataservice.setBackButton(false) : this.dataservice.setBackButton(true);
  }
}
