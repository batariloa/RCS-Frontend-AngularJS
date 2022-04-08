import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  
  public username: string = '';
  public password: string = '';
  public urlLocal:string = 'http://94.189.234.3:8080';  

  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<boolean> {
    return this.http.post<{token: string}>(this.urlLocal + '/authenticate', {username: username, password: password})
      .pipe(
        map((result:any) => {
          console.log(" BLBLLBLBLBLBL " , result.jwtToken)
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

   getStatus(){
      let url= this.urlLocal + "/getStatus"

      return this.http.get(url, { headers: { Authorization:  this.getToken() }})

    }



    callShutdown(){
      let url=this.urlLocal + "/shutdown"
      console.log("called")
      return this.http.get(url,{ headers: { Authorization: this.getToken() }});

    }


    callCommand(cmd:string){
      let url=this.urlLocal + "/command"
      console.log("called cmd")
      return this.http.post<String>(url, cmd, { headers: { Authorization: this.getToken()}});

    }
    callMonkey(){
      let url=this.urlLocal +"/monkey"
      console.log("called")
      return this.http.get(url, { headers: { Authorization: this.getToken()}});

    }

    callTorrent(cmd:string){
      let url=this.urlLocal + "/torrent"
      console.log("torrent")
      return this.http.post<String>(url, cmd, { headers: { Authorization: this.getToken()}});

    }
  
  
    createBasicAuthToken(username: string, password: string) {
      return 'Bearer ' + window.btoa(username + ":" + password);
    }
    registerSuccessfulLogin(username:string, password:string) {
     console.log("username je " + username)
    }




  
}
