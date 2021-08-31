import {HttpEvent, HttpHandler, HttpInterceptor, HttpParams, HttpRequest} from "@angular/common/http";
import * as fromApp from '../store/app.reducer'

import {Store} from "@ngrx/store";
import {Observable} from "rxjs";
import {exhaustMap, map, take} from "rxjs/operators";
import {Injectable} from "@angular/core";

@Injectable()
export class RecipeInterceptorService implements HttpInterceptor{
  constructor(private store: Store<fromApp.AppState>) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
     const modifiedReq = req.clone({
          params: new HttpParams().set('X-API-KEY', 'HoA')
     });
     return next.handle(modifiedReq);
  }
}
