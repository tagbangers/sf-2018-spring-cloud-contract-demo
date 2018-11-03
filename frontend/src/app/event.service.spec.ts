import { TestBed } from '@angular/core/testing';

import { PactWeb, Matchers } from '@pact-foundation/pact-web';
import { HttpClientModule } from '@angular/common/http';
import { EventService } from './event.service';

describe('EventService', () => {

  let provider;

  beforeAll((done) => {
    provider = new PactWeb({
      consumer: 'frontend',
      provider: 'backend',
      port: 1234,
      host: '127.0.0.1'
    });

    setTimeout(done, 2000);
    provider.removeInteractions();
  });

  afterAll((done) => {
    provider.finalize().then(done, done.fail);
  });

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule
      ],
      providers: [
        EventService
      ]
    });
  });

  afterEach((done) => {
    provider.verify().then(done, e => done.fail(e));
  });

  describe('get', () => {
    beforeAll((done) => {
      provider.addInteraction({
        uponReceiving: 'a request for event',
        withRequest: {
          method: 'GET',
          path: '/events/spring-fest-2018'
        },
        willRespondWith: {
          status: 200,
          headers: {
            'Content-Type': 'application/hal+json;charset=UTF-8'
          },
          body: {
            'title' : 'Spring Fest 2018',
            'slug' : 'spring-fest-2018',
            'sessions' : [ {
              'title' : 'Spring Boot with Kotlin, functional configuration and GraalVM',
              'room' : 'Hall'
            }, {
              'title' : '大規模金融系SaaSを支えるSpring ～活用の変遷と新時代のアーキテクチャ～',
              'room' : 'Annex'
            }, {
              'title' : 'Spring Data REST と Spring Cloud Contract',
              'room' : '2nd'
            }, {
              'title' : 'Spring BootでHello Worldのその先へ ～ウェブDBプレスのSpringBoot特集で伝えたかったこと＆伝えきれなかったこと～',
              'room' : '111'
            } ],
            '_links' : Matchers.somethingLike({
              'self' : {
                'href' : 'http://localhost:8080/events/spring-fest-2018'
              },
              'event' : {
                'href' : 'http://localhost:8080/events/spring-fest-2018'
              }
            })
          }
        }
      }).then(done, done.fail);
    });

    it('should', (done) => {
      const eventService: EventService = TestBed.get(EventService);
      eventService.get('spring-fest-2018').subscribe(response => {
        // expect(response).toEqual({id: 1});
        done();
      }, error => {
        done.fail(error);
      });
    });
  });
});
