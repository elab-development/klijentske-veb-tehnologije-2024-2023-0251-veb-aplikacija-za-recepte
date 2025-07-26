import { Component } from '@angular/core';
import { ReceptiButtonDirective } from '../../common/button/button-directive';

@Component({
  selector: 'app-home',
  imports: [ReceptiButtonDirective],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
