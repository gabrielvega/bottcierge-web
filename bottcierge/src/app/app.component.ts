import { Component } from '@angular/core';
import { ChatService } from './chat/services/chat.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'bottcierge-web';

  constructor(private chatService: ChatService) {}

  orderSummary() {
    console.log(this.chatService.getOrderSummary());
  }
}
