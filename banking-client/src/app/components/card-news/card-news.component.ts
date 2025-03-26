import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-card-news',
  imports: [],
  templateUrl: './card-news.component.html',
  styleUrl: './card-news.component.css'
})
export class CardNewsComponent {
  @Input() title!: string;
  @Input() desc!: string;
  @Input() imgUrl!: string;
  @Input() newsUrl!: string;
}
