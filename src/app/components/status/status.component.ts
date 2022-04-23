import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { FormsModule } from '@angular/forms';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.css']
})
export class StatusComponent implements OnInit {

  statusString:String = "";
  statusDate:String = "";
command:string = "";
commandShow = false;
commandSent = false;
torrentShow = false;
torrentSent =false;
diskSpaceTotal:number = 0;
diskSpaceUsable:number = 0;
ip:string = "";
torrent:string = "";

  title = 'RemoteStatus';
  constructor(public api:ApiService, route:ActivatedRoute){
    
    setTimeout(()=>{
      this.callApi()
    }, 1000)


  
 
  }
  ngOnInit(): void {
 
  }
   callShutdown() {
      this.api.callShutdown().subscribe((data:any) =>{
        console.warn(data)
      })  
  }

callMonkey() {
    this.api.callMonkey().subscribe((data:any) =>{
      console.warn(data)
    })  
}


callCommand() {

  if(this.commandShow){
  this.api.callCommand(this.command).subscribe();
  this.commandSent = true;
  }
  

  if(!this.commandShow)
  this.commandShow=true

}


callTorrent() {

  if(this.torrentShow){
  this.api.callTorrent(this.torrent).subscribe();
  this.torrentSent = true;
  }

  if(!this.torrentShow)
  this.torrentShow=true


}

callApi(){

  this.api.getStatus().subscribe((data:any) => {
    console.warn(data)
    this.statusString = data.status
    this.statusDate = data.date
    this.diskSpaceTotal = data.diskSpaceTotal;
    this.diskSpaceUsable = data.diskSpaceUsable;
  })

}
}
