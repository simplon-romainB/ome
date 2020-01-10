import { Component, OnInit } from '@angular/core';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.styl']
})
export class ContactComponent implements OnInit {

  constructor(private usersService: UsersService) { }

  ngOnInit() {
  }
private contact = {
  name: null,
  email: null,
  message: null
}
sendContact(name,email,message) {
var s = this.usersService.sendContact(name,email,message)
}
}
