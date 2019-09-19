import { Component } from '@angular/core';
import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';
import $ from 'jquery';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  private serverUrl = 'http://localhost:8080/ws';
  private stompClient;
  title = 'WebSockets chat';

  constructor() {
    this.initializeWebSocketConnection();
  }

  initializeWebSocketConnection() {
    const ws = new SockJS(this.serverUrl);
    this.stompClient = Stomp.over(ws);
    const that = this;
    this.stompClient.connect({}, function(frame) {
      that.stompClient.subscribe('/topic/notification', (message) => {
        if (message.body) {
          $('.chat').append("<div class='message'>" + message.body + "</div>")
          console.log(message);
        }
      });
    });
  }

  joinGame() {
    this.stompClient.send("/app/game/join" , {});
  }
}
