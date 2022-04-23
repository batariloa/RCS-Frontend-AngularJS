import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  
  public username: string = '';
  public password: string = '';
  public urlLocal:string = 'http://localhost:8079';  

  constructor(private http: HttpClient) {}  

  login(username: string, password: string): Observable<boolean> {
    return this.http.post<string>(this.urlLocal + '/authenticate', {username: username, password: password})
      .pipe(
        map((result:any) => {
          localStorage.setItem("username", username);
  
      
          localStorage.setItem('access_token', result.jwtToken);
          return true;
        })
      );
  }

  logout() {
    localStorage.removeItem('access_token');
  }

  public  isUserLoggedIn(): boolean {
    return (localStorage.getItem('access_token') !== null);
  }

    getToken() {
      return  "Bearer " + localStorage.getItem('access_token');
    }

    getUsername() {
      return   localStorage.getItem('username');
    }

   getStatus(){

      let url= this.urlLocal + "/status?username="+this.getUsername();
      console.log("Called this " + url)

      return this.http.get(url, { headers: { Authorization:  this.getToken() }})

    } 


    callShutdown(){
      let url=this.urlLocal + "/shutdown?username="+this.getUsername();
      console.log("called")
      return this.http.post<String>(url,{ headers: { Authorization: this.getToken() }});

    }


    callCommand(cmd:string){
      let url=this.urlLocal + "/terminal?username="+this.getUsername()+ "&command="+cmd;
      console.log("called cmd")
      return this.http.post<String>(url, cmd, { headers: { Authorization: this.getToken()}});

    }
    callMonkey(){
      let url=this.urlLocal +"/monkey?username="+this.getUsername();
      console.log("called " + url)
      console.log("token is " + this.getToken());
      return this.http.post<any>(url, "Requesting monkey.", { headers: { Authorization: this.getToken()}});

    }

    callTorrent(cmd:string){
      let url=this.urlLocal + "/torrent"
      console.log("torrent")
      return this.http.post(url, cmd, { headers: { Authorization: this.getToken()}});

    }
  
  
    createBasicAuthToken(username: string, password: string) {
      return 'Bearer ' + window.btoa(username + ":" + password);
    }
    registerSuccessfulLogin(username:string, password:string) {
     console.log("username je " + username)
    }


    register(email:string, password:string) {

      console.log("saljem")
      return this.http.post(this.urlLocal+"/register", {email: email, password: password});
    }



  
}
