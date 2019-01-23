import { Injectable } from '@angular/core';
import { GitSearch } from './git-search';
import { GitUsers } from './git-users';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GitSearchService {
  cachedValues:Array<{ [query:string]: GitSearch }> = [];
  cachedUsers:Array<{ [uname: string]: GitUsers }> = [];
  constructor( private http: HttpClient ) { }

  //function to serve as an api for components
  gitSearch = (query: string) => {
    let promise = new Promise<GitSearch>((resolve,reject) => {
      if(this.cachedValues[query]){
        resolve(this.cachedValues[query] as GitSearch);
      }
      else{
        this.http.get('https://api.github.com/search/repositories?q=' + query)
        .toPromise()
        .then( (response) => {
          resolve(response as GitSearch);
        },(error) =>{
          reject(error);
        })
      }
    });
    return promise;
  }

  //git-users api service
  gitUsers = (uname:string)=>{
    let promise = new Promise((resolve,reject)=>{
      if(this.cachedUsers[uname]){
        resolve(this.cachedUsers[uname]);
      }
      else{
        this.http.get('https://api.github.com/search/users?q='+uname)
        .toPromise()
        .then((response)=>{
          resolve(response as GitUsers);
        },(error) =>{
          reject(error);
        });
      }
    });

    return promise;
  }
}
