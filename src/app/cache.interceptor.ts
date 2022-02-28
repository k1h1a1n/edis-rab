import { Injectable } from '@angular/core';
import { HttpEvent, HttpRequest, HttpInterceptor, HttpHandler } from '@angular/common/http';
import { Observable } from 'rxjs';
import { finalize, shareReplay } from 'rxjs/operators';

@Injectable()
export class CacheInterceptor implements HttpInterceptor {

  constructor(private cache: HttpRequestCache) {}
  
  public intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // processing only GET requests
    if (request.method !== 'GET') {
        
       return next.handle(request);

    }
    
    // if the request is not cached yet
    if (!this.cache.has(request)) {
      // we should create a new request
      const response = next.handle(request).pipe(
        // when the request is completed we should clean cache
        finalize(() => this.cache.delete(request)),
        // and don't forget to share the Observable between subscribers
        shareReplay({ refCount: true, bufferSize: 1 })
      );
      // after that we put the request into the cache
      this.cache.set(request, response);
    }
    
    return this.cache.get(request);
  }
  
}

@Injectable({ providedIn: 'root' })
export class HttpRequestCache {

  // Using the object gives more performance than a Map
  private readonly requests: Record<string, Observable<HttpEvent<any>>> = {};
  
  public has(request: HttpRequest<any>): boolean {
    return this.key(request) in this.requests;
  }  
  
  public get(request: HttpRequest<any>): Observable<HttpEvent<any>> {
    return this.requests[this.key(request)];
  }
  
  public set(request: HttpRequest<any>, response: Observable<HttpEvent<any>>): void {
    this.requests[this.key(request)] = response;
  }
  
  public delete(request: HttpRequest<any>): void {
    delete this.requests[this.key(request)];
  }
  
  private key(request: HttpRequest<any>): string {
    return [request.urlWithParams, request.responseType].join('#');
  }
  
}
