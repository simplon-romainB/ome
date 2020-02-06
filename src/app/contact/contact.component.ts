import { Component } from '@angular/core';
import { UsersService } from '../users.service';
import { Contact } from '../contact.model';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.styl']
})
export class ContactComponent {


  constructor(private usersService: UsersService, private contact: Contact) { }



sendContact(name: string, email: string, message: string) {
  this.usersService.sendContact(name, email, message);
  this.contact.name = null;
  this.contact.email = null;
  this.contact.message = null;
  alert('votre message a bien été envoyé, merci');

  }
}
