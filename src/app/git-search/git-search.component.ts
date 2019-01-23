import { Component, OnInit } from '@angular/core';
import { GitSearchService } from '../git-search.service';
import { GitSearch } from '../git-search';
import { ActivatedRoute, ParamMap,Router } from '@angular/router';

@Component({
  selector: 'app-git-search',
  templateUrl: './git-search.component.html',
  styleUrls: ['./git-search.component.css'],
})
export class GitSearchComponent implements OnInit {
  searchResults: GitSearch;
  searchQuery:string;
  title: string;
  displayQuery: string;
  length:number;
  start:number = 0;
  end:number;

  constructor(private GitSearchService :GitSearchService,private route:ActivatedRoute,
    private router:Router) { }

  ngOnInit() {
    this.route.paramMap.subscribe( (params: ParamMap) => {
      this.searchQuery = params.get('query');
      this.displayQuery = params.get('query');
      this.gitSearch();  
    })

    this.GitSearchService.gitSearch('angular').then((response) => {
      this.searchResults = response as GitSearch;
      this.length = this.searchResults.items.length;
      this.start =0
      this.end = 5;
    }, (error) => {
      alert("Error: " + error.statusText)
    })

    this.route.data.subscribe( (result) => {
      this.title = result.title
    });
  }
sendQuery = () => {
    this.searchResults = null;
    this.router.navigate(['/search/' + this.searchQuery])
}
  gitSearch = () => {
    this.GitSearchService.gitSearch(this.searchQuery).then((response) => {
      this.searchResults = response as GitSearch;
      this.length = this.searchResults.items.length;
      this.start =0;
      this.end = 5;
    }, (error) => {
      alert("Error: " + error.statusText)
    })
  }

  //Next Button page
  next(){
    if(this.length == this.end)
    {}
    else if(this.length < this.end + 5){
      this.start = this.end;
      this.end = this.length;
    }
    else{
      this.start += 5;
      this.end += 5;
    }
    console.log("start: "+this.start+" end: "+this.end+" length: "+this.length);
  }

  //previous
  previous(){
    if(this.start - 5 < 0){
      this.start = 0;
      this.end = (this.length < 5)? this.length:5;
    }
    else{
      this.start -= 5 ;
      this.end -= 5;
    }
    console.log("start: "+this.start+" end: "+this.end+" length: "+this.length);
  }
}
