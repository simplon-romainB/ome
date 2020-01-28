import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class KeepconnectionService {
  public email: String;
  public authToken: String;
  public authRole: String;
  public activatedAccount: String;
  public connexion: Number = 0;
  constructor() { }
}
