import { Injectable } from '@angular/core';
import {jwtDecode} from "jwt-decode";

@Injectable({
  providedIn: 'root'
})
export class JwtService {

  constructor() { }

  public extraireClaim(jwt: string, claimKey: string) : string | null {
    try {
      const jetonDecode: any = jwtDecode(jwt);
      return jetonDecode[claimKey] ? jetonDecode[claimKey].toString() : null;
    } catch (error) {
      return null;
    }
  }
}
