import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Navbar } from './components/navbar/navbar';
import { Register } from './pages/register/register';
import { Login } from './pages/login/login';

@Component({
  selector: 'app-root',
  // imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss',
  imports: [Navbar, RouterOutlet, Register, Login],
})
export class App {
  protected readonly title = signal('frontend');
}
