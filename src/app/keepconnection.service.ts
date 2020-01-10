import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class KeepconnectionService {
  public email;
  public authToken;
  public authRole;
  public activatedAccount;
  public connexion = 0;
  constructor() { }
}
