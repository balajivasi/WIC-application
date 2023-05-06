import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-light-box',
  templateUrl: './light-box.component.html',
  styleUrls: ['./light-box.component.css']
})
export class LightBoxComponent {
  @Input() ImageUrl = '';
  @Output() close = new EventEmitter<boolean>();

  closeModal(){
    this.close.emit(true);
  }
}
