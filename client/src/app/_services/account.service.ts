import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
import { User } from '../_models/user';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  //ovaj servis sse koristi za slanje zahteva serveru prilikom prijavljivanja
  // servise koristimo da saljemo http zahteve da bismo ih izdvojili, iako je to moguce uraditi iz komponente

  baseUrl = environment.apiUrl;
  //kreiramo observable da bi drugi delovi klijentske aplikacije mogli da imaju informaciju o tome da li je korisnik prijavljen i koristimo specijalan tip Observable objekta koje se zove BehaviorSubject pomocu koga observable moze da ima inicijalnu vrednost
  private currentUserSource = new BehaviorSubject<User | null>(null);
  currentUser$ = this.currentUserSource.asObservable();
  //dolar oznacava da je Observable

  constructor(private http : HttpClient) { }

  login(model: any)
  {
    return this.http.post<User>(this.baseUrl + 'account/login', model).pipe(
      map((res: User) => {
        const user = res;
        if(user)
        {
          localStorage.setItem('user', JSON.stringify(user))
          this.currentUserSource.next(user);
        }
      })
    );
    //drugi parametar (model) je body zahteva
  }

  logout(){
    localStorage.removeItem('user');
    this.currentUserSource.next(null);
  }

  //ovu metodu pozivacemo iz komponente
  setCurrentUser(user: User)
  {
    this.currentUserSource.next(user);
  }

  register(model:any){
    return this.http.post<User>(this.baseUrl+'account/register', model)
    .pipe(
      map(user => {
        if(user){
          localStorage.setItem('user', JSON.stringify(user))
          this.currentUserSource.next(user);
        }
      })
    )
  }
}
