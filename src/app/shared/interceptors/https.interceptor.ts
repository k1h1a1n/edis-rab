import { Injectable } from '@angular/core';
import {
    HttpEvent,
    HttpInterceptor,
    HttpHandler,
    HttpRequest,
    HttpResponse
} from '@angular/common/http';

import { Observable, of, timer, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { timeout, map, catchError } from 'rxjs/operators';


@Injectable()

export class HttpsInterceptor implements HttpInterceptor {
    intercept(
        req: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {




        var IFADBNameDBKey = localStorage.getItem("IFADBNameDBKey") != undefined ? localStorage.getItem("IFADBNameDBKey") : "";
        var GrouID = localStorage.getItem("GrouID") != undefined ? localStorage.getItem("GrouID") : `${environment.GrouID}`;
        var IFAID = localStorage.getItem("IFAID") != undefined ? localStorage.getItem("IFAID") : `${environment.IFAID}`;

        // Passing DIH_IFAID from app.html
        if( req.url.indexOf(environment.iMagicUrl) !== -1 || req.url.indexOf(environment.magicStoreUrl) !== -1 ) {
          console.log('IFAID set as ' + environment.DIH_IFAID + ' for URL : ', req.url);
          IFAID = environment.DIH_IFAID;
        }

        // console.warn('HttpsInterceptor');
        if (req.body) {
            // Append addition property
            var addParam;
            if (req.body instanceof FormData) {

                req.body.append("IFAID", IFAID);
                req.body.append("IFAKey", IFADBNameDBKey);
                req.body.append("GrouID", GrouID);
                req.body.append("IsWMPRO", `${environment.IsWMPRO}`);

                 addParam = req.clone({
                        //params: req.params.set('sessionid', `${environment.IFAID}`),
                        url: req.url.replace('http://', 'http://'),
                        body: req.body
                    });


            } else {

                    addParam = req.clone({
                       // params: req.params.set('sessionid', `${environment.IFAID}`),
                        url: req.url.replace('http://', 'http://'),
                        body: { ...req.body, IFAID: IFAID, GroupID: GrouID, GrouID: GrouID, IsWMPRO: `${environment.IsWMPRO}`, IFAKey: IFADBNameDBKey }
                    });

            }
            // params: sessionid is dummy currently not in use
            console.log(addParam);
            return next.handle(addParam).pipe(
                timeout(1200000),
                map(res => {
                    return res;
                }),
                catchError(err => {
                    console.log(err);
                    if (err.name === 'TimeoutError') {
                        alert("Looks like the server is taking to long to respond, please try again in sometime.");
                    }
                    // return Observable.throw(err)
                    return throwError(err)
                }
                ))
        } else {

            addParam = req.clone({
                //params: req.params.set('sessionid', `${environment.IFAID}`),
                url: req.url.replace('http://', 'http://'),
                body: { IFAID: `${environment.IFAID}`, GrouID: `${environment.GrouID}`, IsWMPRO: `${environment.IsWMPRO}` }
            });
            return next.handle(addParam).pipe(
                map(res => {
                    return res;
                })
            );
        }
        }


}
