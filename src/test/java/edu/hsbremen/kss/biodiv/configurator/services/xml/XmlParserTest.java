package edu.hsbremen.kss.biodiv.configurator.services.xml;

import edu.hsbremen.kss.biodiv.configurator.services.xml.model.XmlFileModel;
import junit.framework.TestCase;
import org.junit.Test;
import org.xml.sax.SAXException;

import javax.xml.parsers.ParserConfigurationException;
import java.io.IOException;
import java.io.InputStream;

/**
 * Created by Svenja on 22.06.2015.
 */
public class XmlParserTest extends TestCase {

    @Test
    public void testParse(){
        InputStream xmlFile = XmlParserTest.class.getResourceAsStream("/xml-configs/Einzeldatenerfassung.xml");
        try {
            XmlParser parser = new XmlParser();
            XmlFileModel xmlFileModel = parser.parse(xmlFile);

            System.out.println(xmlFileModel);

        } catch (ParserConfigurationException e) {
            e.printStackTrace();
        } catch (SAXException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}