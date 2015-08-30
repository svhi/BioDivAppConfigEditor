package edu.hsbremen.kss.biodiv.configurator.services.xml;

import junit.framework.TestCase;
import org.junit.Assert;
import org.junit.Test;
import org.xml.sax.SAXException;

import javax.xml.parsers.ParserConfigurationException;
import java.io.IOException;
import java.io.InputStream;

/**
 * Created by Svenja on 22.06.2015.
 */
public class XmlWriterTest extends TestCase {

    @Test
    public void testWrite(){
        InputStream xmlFile = XmlWriterTest.class.getResourceAsStream("/xml-configs/Einzeldatenerfassung.xml");
        try {
            XmlParser parser = new XmlParser();
            XmlFileModel xmlFileModel = parser.parse(xmlFile);

            //System.out.println(xmlFileModel);

            XmlWriter xmlWriter = new XmlWriter();

            String xmlString = xmlWriter.writeToXML(xmlFileModel);
            System.out.print(xmlString);

            //Assert.assertEquals(xmlFile.toString().trim(), xmlString.trim());

        } catch (ParserConfigurationException e) {
            e.printStackTrace();
        } catch (SAXException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}