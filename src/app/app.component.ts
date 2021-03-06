import { Component } from '@angular/core';
import { HubConnection, HubConnectionBuilder, LogLevel } from '@aspnet/signalr';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  private connection: HubConnection;

  public msgs;

  constructor() {

    this.msgs = [];

    this.connection = new HubConnectionBuilder()
      .withUrl('http://10.200.16.23:55614/event')
      .configureLogging(LogLevel.Trace)
      .build();
    this.connection.serverTimeoutInMilliseconds = 3000;

    this.connection.onclose(() => {

      this.msgs.push('Connection Lost');
    });
  }

  connectSignalR() {
    this.connection.start()
      .then(() => {

        this.msgs.push('Connection Established');

        this.connection.on('event', (data) => {

          this.msgs.push(data);
        });
      })
      .catch(() => {

        this.msgs.push('Connection Failed');
      });
  }
}
