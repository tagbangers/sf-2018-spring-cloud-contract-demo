package springfest.backend;

import io.restassured.RestAssured;
import org.junit.Before;
import org.junit.runner.RunWith;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.web.server.LocalServerPort;
import org.springframework.test.context.junit4.SpringRunner;

@RunWith(SpringRunner.class)
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
public class AbstractContractTestBase {

	@LocalServerPort
	private int port;

	@Before
	public void before() {
		RestAssured.baseURI = "http://localhost:" + this.port;
	}

}
