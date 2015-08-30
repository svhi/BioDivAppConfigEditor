package edu.hsbremen.kss.biodiv.configurator.XmlFile;

import com.fasterxml.jackson.databind.util.JSONPObject;
import edu.hsbremen.kss.biodiv.configurator.atlas.Atlas;
import edu.hsbremen.kss.biodiv.configurator.services.xml.XmlFileModel;
import edu.hsbremen.kss.biodiv.configurator.services.xml.XmlParser;
import edu.hsbremen.kss.biodiv.configurator.services.xml.XmlWriter;
import org.apache.catalina.util.XMLWriter;
import org.springframework.core.io.InputStreamResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.xml.sax.SAXException;

import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletResponse;
import javax.xml.parsers.ParserConfigurationException;
import java.io.*;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/xmlfile")
public class XmlFileController {

    @RequestMapping("/id/{xmlFileID}")
    public @ResponseBody
    XmlFileModel get(@PathVariable("xmlFileID") String xmlFileID) {

        System.out.println("==== XmlFileController");

        InputStream xmlFile = XmlFileController.class.getResourceAsStream("/xml-configs/simpleConfig.xml");
        try {
            XmlParser parser = new XmlParser();
            XmlFileModel xmlFileModel = parser.parse(xmlFile);


            xmlFileModel.setFileName("sampleConfig.xml");
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

    @RequestMapping(value="/upload", method=RequestMethod.POST)
    public @ResponseBody
    XmlFileModel uploadXmlFile(@RequestParam("file") MultipartFile file) {
        System.out.println("==== XmlFileController UPLOAD");
        if (!file.isEmpty()) {
            try {

                InputStream xmlFile = file.getInputStream();
                try {
                    XmlParser parser = new XmlParser();
                    XmlFileModel xmlFileModel = parser.parse(xmlFile);

                    System.out.println("     file: "+file.getOriginalFilename());
                    xmlFileModel.setFileName(file.getOriginalFilename());
                    return xmlFileModel;

                } catch (ParserConfigurationException e) {
                    e.printStackTrace();
                } catch (SAXException e) {
                    e.printStackTrace();
                } catch (IOException e) {
                    e.printStackTrace();
                }

                return null;

            } catch (Exception e) {
                return null;//"You failed to upload " + name + " => " + e.getMessage();
            }
        } else {
            return null; //"You failed to upload " + name + " because the file was empty.";
        }
    }
    @RequestMapping(value="/validate", method=RequestMethod.POST)
    public @ResponseBody
    XmlFileModel validateXmlFile(@RequestBody XmlFileModel xmlFileModel) {
        System.out.println("==== XmlFileController VALIDATE");
        return null;
    }


    @RequestMapping(value="/download", method=RequestMethod.POST)
    public @ResponseBody
    ResponseEntity<InputStreamResource> downloadXmlFile(@RequestBody XmlFileModel xmlFileModel) {
        System.out.println("==== XmlFileController DOWNLOAD");
        XmlWriter xmlWriter = new XmlWriter();
        xmlWriter.writeToXML(xmlFileModel);

        //ClassPathResource pdfFile = new ClassPathResource("pdf-sample.pdf");

        String xmlString = xmlWriter.writeToXML(xmlFileModel);


        return ResponseEntity
                .ok()
                .contentLength(xmlString.getBytes().length)
                .contentType(
                        MediaType.TEXT_XML)
                .body(new InputStreamResource(new ByteArrayInputStream(xmlString.getBytes(StandardCharsets.UTF_8))));
    }
}
