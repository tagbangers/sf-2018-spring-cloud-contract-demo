package springfest.backend;

import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@Entity
@NoArgsConstructor
@Getter
public class Event extends AbstractEntity {

	private String title;

	@Column(unique = true)
	private String slug;

	@OrderColumn
	@Column(unique = true)
	@OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
	private final List<Session> sessions = new ArrayList<>();

	public Event(String title, String slug, Session... sessions) {
		this.title = title;
		this.slug = slug;
		this.sessions.addAll(Arrays.asList(sessions));
	}


}
