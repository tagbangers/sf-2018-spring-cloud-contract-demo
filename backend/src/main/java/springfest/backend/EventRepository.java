package springfest.backend;

import org.springframework.data.repository.CrudRepository;

import java.util.Optional;

public interface EventRepository extends CrudRepository<Event, Long> {

	Optional<Event> findBySlug(String slug);

}
