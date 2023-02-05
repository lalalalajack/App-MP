import { HttpParams, HttpClient } from '@angular/common/http';

import { Inject, Injectable } from '@angular/core';
import { API_CONFIG, ServicesModule } from './services.module';
import { SearchResult } from './data-types/common.types';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: ServicesModule
})
export class SearchService {


  constructor(
    private http: HttpClient,
    @Inject(API_CONFIG) private uri: string
  ) { }

  search(keyWords: string): Observable<SearchResult> {
    const params = new HttpParams().set('keywords', keyWords);
    return this.http.get(this.uri + 'search/suggest', { params })
      .pipe(
        map((res: { result: SearchResult }) => res.result)
      );
  }
}
