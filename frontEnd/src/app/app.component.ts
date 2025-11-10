import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ConnectionComponent } from "./connection/connection.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ConnectionComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'frontEnd';
}
