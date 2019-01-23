import { Component, OnInit } from '@angular/core';
import { GitSearchService } from './git-search.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [GitSearchService]
})
export class AppComponent implements OnInit{
  // constructor (private GitSearchService: GitSearchService){

  // }
  constructor (){}
  ngOnInit(){
  //   this.GitSearchService.gitSearch('angular').then((response)=>{

  //     alert("Total Libraries "+ response["total_count"]);
  //   },(error)=>{
  //     alert("Error: " + error.statusText);
  //   });

  //   this.GitSearchService.gitUsers('aks2291').then((response)=>{
  //     alert("Total users "+ response["total_count"]);
  //   },(error)=>{
  //     alert("Error : "+error.statusText);
  //   })
  }
  title = 'Git Search';
}
