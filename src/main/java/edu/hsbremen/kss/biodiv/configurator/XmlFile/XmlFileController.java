package edu.hsbremen.kss.biodiv.configurator.XmlFile;

import edu.hsbremen.kss.biodiv.configurator.atlas.Atlas;
import edu.hsbremen.kss.biodiv.configurator.services.xml.XmlFileModel;
import edu.hsbremen.kss.biodiv.configurator.services.xml.XmlParser;
import org.springframework.web.bind.annotation.*;
import org.xml.sax.SAXException;

import javax.xml.parsers.ParserConfigurationException;
import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/xmlfile")
public class XmlFileController {

    @RequestMapping("/{xmlFileID}")
    public @ResponseBody
    XmlFileModel get(@PathVariable("xmlFileID") String xmlFileID) {

        System.out.println("==== XmlFileController");

        InputStream xmlFile = XmlFileController.class.getResourceAsStream("/xml-configs/Einzeldatenerfassung.xml");
        try {
            XmlParser parser = new XmlParser();
            XmlFileModel xmlFileModel = parser.parse(xmlFile);

            return xmlFileModel;

        } catch (ParserConfigurationException e) {
            e.printStackTrace();
        } catch (SAXException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        }

        return null;
    }

}
