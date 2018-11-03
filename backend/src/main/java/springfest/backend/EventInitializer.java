package springfest.backend;

import lombok.RequiredArgsConstructor;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class EventInitializer {

	private final EventRepository events;

	@EventListener
	public void init(ApplicationReadyEvent readyEvent) {
		if (this.events.count() != 0) {
			return;
		}

		Session session1 = new Session("Spring Boot with Kotlin, functional configuration and GraalVM", "Hall");
		Session session2 = new Session("大規模金融系SaaSを支えるSpring ～活用の変遷と新時代のアーキテクチャ～", "Annex");
		Session session3 = new Session("Spring Data REST と Spring Cloud Contract", "2nd");
		Session session4 = new Session("Spring BootでHello Worldのその先へ ～ウェブDBプレスのSpringBoot特集で伝えたかったこと＆伝えきれなかったこと～", "111");

		Event event = new Event("Spring Fest 2018", "spring-fest-2018", session1, session2, session3, session4);
		this.events.save(event);
	}

}
