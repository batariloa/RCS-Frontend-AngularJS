import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  
  public username: string = '';
  public password: string = '';
  

  constructor(private http: HttpClient) {}

   getStatus(){
      let url="http://b576-94-189-237-73.ngrok.io/getStatus"
    
      return this.http.get(url, { headers: { authorization: this.createBasicAuthToken(this.username, this.password) }})

    }

    login(username: string, password: string) {
      return this.http.get("http://b576-94-189-237-73.ngrok.io/login",
        { headers: { authorization: this.createBasicAuthToken(username, password) } }).pipe(map((res) => {
          sessionStorage.setItem('loggedIn', username)
          this.username = username;
          this.password = password;
          this.registerSuccessfulLogin(username, password);
        }));
    }


    callShutdown(){
      let url="http://b576-94-189-237-73.ngrok.io/shutdown"
      console.log("called")
      return this.http.get(url);

    }
  
    createBasicAuthToken(username: string, password: string) {
      return 'Basic ' + window.btoa(username + ":" + password);
    }
    registerSuccessfulLogin(username:string, password:string) {
     console.log("username je " + username)
    }


  isUserLoggedIn() {
    let user = sessionStorage.getItem('loggedIn')
    console.log(!(user === null))
    return !(user === null)
  }

  
}
