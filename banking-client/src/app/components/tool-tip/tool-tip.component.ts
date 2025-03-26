import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-tool-tip',
  imports: [],
  templateUrl: './tool-tip.component.html',
  styleUrl: './tool-tip.component.css',
})
export class ToolTipComponent {
  @Input() card!: string;
  @Input() ammount!: string;
}
