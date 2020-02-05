import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class KeepconnectionService {
  public email: string;
  public authToken: string;
  public authRole: string;
  public activatedAccount: string;
  public connexion: number = 0;
  constructor() { }
}
