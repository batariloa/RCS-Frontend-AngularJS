import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.css']
})
export class StatusComponent implements OnInit {

  statusString:String = "";
  statusDate:String = "";
  title = 'RemoteStatus';
  constructor(public api:ApiService, route:ActivatedRoute){
    this.api.getStatus().subscribe((data:any) => {
      console.warn(data)
      this.statusString = data.status
      this.statusDate = data.date
    })

  
 
  }
  ngOnInit(): void {
 
  }
   callShutdown() {
      this.api.callShutdown().subscribe((data:any) =>{
        console.warn(data)
      })  
  }

}
