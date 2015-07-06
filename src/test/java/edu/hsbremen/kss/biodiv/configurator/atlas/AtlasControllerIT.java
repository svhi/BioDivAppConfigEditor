package edu.hsbremen.kss.biodiv.configurator.atlas;

import edu.hsbremen.kss.biodiv.configurator.BioDivAppConfigurationEditorApplication;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.test.IntegrationTest;
import org.springframework.boot.test.SpringApplicationConfiguration;
import org.springframework.boot.test.TestRestTemplate;
import org.springframework.http.ResponseEntity;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.test.context.web.WebAppConfiguration;
import org.springframework.web.client.RestTemplate;

import java.net.URL;

import static org.hamcrest.Matchers.equalTo;
import static org.junit.Assert.assertThat;

/**
 * As well as mocking the HTTP request cycle we can also use Spring Boot to write a very simple full-stack integration
 * test.
 *
 * The embedded atlas is started up on a random port by virtue of the @IntegrationTest("${atlas.port=0}") and the
 * actual port is discovered at runtime with the @Value("${local.atlas.port}").
 * http://docs.spring.io/spring-boot/docs/current/reference/html/boot-features-testing.html
 */
@RunWith(SpringJUnit4ClassRunner.class)
@SpringApplicationConfiguration(classes = BioDivAppConfigurationEditorApplication.class)
@WebAppConfiguration
@IntegrationTest({"atlas.port=0"}) // The actual port is discovered at runtime.
public class AtlasControllerIT {
    @Value("${local.atlas.port}") // Discovering the actual port number.
    private int port;

    private URL base;
    private RestTemplate template;

    private static String URL = "api/atlas/";

    @Before
    public void setUp() throws Exception {
        this.base = new URL("http://localhost:" + port + "/");
        template = new TestRestTemplate();
    }

    @Test
    public void getList() throws Exception {
        ResponseEntity<String> response = template.getForEntity(base.toString()+URL, String.class);
        assertThat(response.getBody(), equalTo("{\"id\":1,\"content\":\"Hello, World!\"}"));
    }
}
