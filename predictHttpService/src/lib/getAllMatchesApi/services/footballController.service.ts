import { Injectable, inject } from '@angular/core';
import {
  HttpClient,
  HttpResponse,
  HttpEvent,
  HttpContext,
} from '@angular/common/http';
import { Observable } from 'rxjs';

import { MatchesResponse } from '../models/matchesResponse';

import { BASE_PATH } from '../../variables';
import { Configuration } from '../../configuration';
import { BaseService } from '../../api.base.service';

@Injectable({
  providedIn: 'root',
})
export class FootballControllerService extends BaseService {
  protected httpClient = inject(HttpClient);

  constructor() {
    super(
      inject(BASE_PATH, { optional: true }) as string | string[] | undefined,
      inject(Configuration, { optional: true }) ?? undefined,
    );
  }

  public getMatches(
    observe?: 'body',
    reportProgress?: boolean,
    options?: {
      httpHeaderAccept?: '*/*';
      context?: HttpContext;
      transferCache?: boolean;
    },
  ): Observable<MatchesResponse>;
  public getMatches(
    observe?: 'response',
    reportProgress?: boolean,
    options?: {
      httpHeaderAccept?: '*/*';
      context?: HttpContext;
      transferCache?: boolean;
    },
  ): Observable<HttpResponse<MatchesResponse>>;
  public getMatches(
    observe?: 'events',
    reportProgress?: boolean,
    options?: {
      httpHeaderAccept?: '*/*';
      context?: HttpContext;
      transferCache?: boolean;
    },
  ): Observable<HttpEvent<MatchesResponse>>;
  public getMatches(
    observe: any = 'body',
    reportProgress = false,
    options?: {
      httpHeaderAccept?: '*/*';
      context?: HttpContext;
      transferCache?: boolean;
    },
  ): Observable<any> {
    let localVarHeaders = this.defaultHeaders;

    const localVarHttpHeaderAcceptSelected: string | undefined =
      options?.httpHeaderAccept ??
      this.configuration.selectHeaderAccept(['application/json']);

    if (localVarHttpHeaderAcceptSelected !== undefined) {
      localVarHeaders = localVarHeaders.set(
        'Accept',
        localVarHttpHeaderAcceptSelected,
      );
    }

    const localVarHttpContext: HttpContext =
      options?.context ?? new HttpContext();

    const localVarTransferCache: boolean = options?.transferCache ?? true;

    let responseType_: 'text' | 'json' | 'blob' = 'json';

    if (localVarHttpHeaderAcceptSelected) {
      if (localVarHttpHeaderAcceptSelected.startsWith('text')) {
        responseType_ = 'text';
      } else if (
        this.configuration.isJsonMime(localVarHttpHeaderAcceptSelected)
      ) {
        responseType_ = 'json';
      } else {
        responseType_ = 'blob';
      }
    }

    const localVarPath = `/api/premierleague/matches`;
    const { basePath, withCredentials } = this.configuration;

    return this.httpClient.request<MatchesResponse>(
      'get',
      `${basePath}${localVarPath}`,
      {
        context: localVarHttpContext,
        responseType: responseType_ as any,
        ...(withCredentials ? { withCredentials } : {}),
        headers: localVarHeaders,
        observe: observe,
        ...(localVarTransferCache !== undefined
          ? { transferCache: localVarTransferCache }
          : {}),
        reportProgress: reportProgress,
      },
    );
  }
}
