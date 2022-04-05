import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  
  public username: string = '';
  public password: string = '';
  public urlLocal:string = 'http://localhost:8080';  

  constructor(private http: HttpClient) {}

   getStatus(){
      let url= this.urlLocal + "/getStatus"
    
      return this.http.get(url, { headers: { authorization: this.createBasicAuthToken(this.username, this.password) }})

    }

    login(username: string, password: string) {
      return this.http.get(this.urlLocal + "/login",
        { headers: { authorization: this.createBasicAuthToken(username, password) } }).pipe(map((res) => {
          sessionStorage.setItem('loggedIn', username)
          this.username = username;
          this.password = password;
          this.registerSuccessfulLogin(username, password);
        }));
    }


    callShutdown(){
      let url=this.urlLocal + "/shutdown"
      console.log("called")
      return this.http.get(url,{ headers: { authorization: this.createBasicAuthToken(this.username, this.password) }});

    }
    callMonkey(){
      let url=this.urlLocal +"/monkey"
      console.log("called")
      return this.http.get(url, { headers: { authorization: this.createBasicAuthToken(this.username, this.password) }});

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
