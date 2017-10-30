import { Http, ConnectionBackend, RequestOptions, RequestOptionsArgs, Headers, Response, ResponseOptions } from '@angular/http';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs/Observable';

export class SecureHttp extends Http {
    constructor(
        private backend: ConnectionBackend,
        private defaultOptions: RequestOptions,
        private _router: Router,
        private _authService: AuthService
    ) {
        super(backend, defaultOptions);
    }

    get(url: string, options?: RequestOptionsArgs): Observable<Response> {
        let http = new Http(this._backend, this._defaultOptions);

        return this._authService.isAuthorized()
            .mergeMap(isAuthorized => {
                if (isAuthorized) {
                    return this.createSecureOptions(options).mergeMap(secureOptions => {
                        return super.get(url, secureOptions)
                            .catch(error => this.handleException(http, error, url, secureOptions));
                    });
                }
                return this._authService.createUnauthorizedResponse('UnAuthorized')
            });
    }

    post(url: string, body: any, options?: RequestOptionsArgs): Observable<Response> {
        return this.createSecureOptions(options).mergeMap(secureOptions => {
            return super.post(url, body, secureOptions);
        });
    }

    private createNoContentResponse(error: any): Observable<Response> {

        let response = new Response(new ResponseOptions({
            body: null,
            headers: error.headers,
            status: 204,
            statusText: 'No Content',
            type: error.type,
            url: error.url
        }));

        return Observable.of(response);
    }

    private createSecureOptions(options?: RequestOptionsArgs): Observable<RequestOptionsArgs> {

        return this.getDefaultHeaders().mergeMap(newHeaders => {
            if (options) {
                if (options.headers) {
                    this.mergeHeaders(options.headers, newHeaders);
                } else {
                    options.headers = newHeaders;
                }
            } else {
                options = new RequestOptions({ headers: newHeaders });
            }

            return Observable.of(options);
        });
    }

    private getDefaultHeaders(): Observable<Headers> {

        return this._authService.getAuthorizationHeader().mergeMap(authHeader => {
            let headers = new Headers();

            if (authHeader) {
                headers.append('Authorization', authHeader);
            }

            headers.append('timestamp', (new Date()).getTime().toString());
            headers.append('Cache-Control', 'no-cache');

            return Observable.of(headers);
        });
    }

    private handleException(http: Http, error: any, url: string, options?: RequestOptionsArgs): Observable<Response> {

        console.log('SecureHttp.handleException()');
        console.error(error);

        switch (error.status) {
            case 401:
                //
                // unauthorized. bad access token.
                //
                return this._authService.createUnauthorizedResponse(error);

            case 404:
                //
                // the web api returned no content.
                //
                return this.createNoContentResponse(error);
        }

        //
        // by default, just rethrow the original error.
        //
        return Observable.throw(error);
    }

    private mergeHeaders(target: Headers, source: Headers): void {
        source.forEach((values: string[], name: string, headers: Map<string, string[]>) => {
            target.set(name, values);
        });
    }
}