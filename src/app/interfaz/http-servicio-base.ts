import {Observable} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';

export class HttpBaseService {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(
    protected http: HttpClient,
    protected SERVER: string
  ) {
  }

  getMethod(uri: string): Observable<any> {
    return this.http.get(this.SERVER + uri, this.httpOptions);
  }

  postMethod(uri: string, data: any): Observable<any> {
    return this.http.post(this.SERVER + uri, JSON.stringify(data), this.httpOptions);
  }

  deleteMethod(uri: string): Observable<any> {
    return this.http.delete(this.SERVER + uri, this.httpOptions);
  }

  updateMethod(uri: string, data: any): Observable<any> {
    return this.http.put(this.SERVER + uri, JSON.stringify(data), this.httpOptions);
  }
}
