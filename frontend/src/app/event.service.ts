import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Event } from './generated-models/events';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  constructor(private httpClient: HttpClient) {
  }

  get(slug: string): Observable<Event> {
    return this.httpClient.get(`/events/${slug}`);
  }

}
