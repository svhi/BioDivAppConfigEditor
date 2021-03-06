package edu.hsbremen.kss.biodiv.configurator.controller.xmlFile;


import edu.hsbremen.kss.biodiv.configurator.services.xml.model.XmlFileModel;
import edu.hsbremen.kss.biodiv.configurator.services.xml.XmlParser;
import edu.hsbremen.kss.biodiv.configurator.services.xml.XmlWriter;
import org.apache.log4j.Logger;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.xml.sax.SAXException;

import javax.xml.parsers.ParserConfigurationException;
import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.nio.charset.StandardCharsets;

@RestController
@RequestMapping("/api/xmlfile")
public class XmlFileController {

    private final Logger LOG = Logger.getLogger(XmlFileController.class.getName());

    @RequestMapping("/id/{xmlFileID}")
    public @ResponseBody
    XmlFileModel get(@PathVariable("xmlFileID") String xmlFileID) {

        LOG.info("==== XmlFileController GET");

        try {
            XmlParser parser = new XmlParser();
            XmlFileModel xmlFileModel = parser.parse(XmlFileController.class.getResourceAsStream("/xml-configs/simpleConfig.xml"));
            xmlFileModel.setValidationMessages(parser.validate(XmlFileController.class.getResourceAsStream("/xml-configs/simpleConfig.xml")));

            xmlFileModel.setFileName("sampleConfig.xml");
            return xmlFileModel;

        } catch (ParserConfigurationException e) {
            LOG.error(e);
        } catch (SAXException e) {
            LOG.error(e);
        } catch (IOException e) {
            LOG.error(e);
        }

        return null;
    }

    @RequestMapping(value="/upload", method=RequestMethod.POST)
    public @ResponseBody
    ResponseEntity<XmlFileModel> uploadXmlFile(@RequestParam("file") MultipartFile file) {
        LOG.info("==== XmlFileController UPLOAD");
        if (!file.isEmpty() && (file.getContentType().equals("application/xml") || file.getContentType().equals("text/xml"))) {

            try {
                XmlParser parser = new XmlParser();
                XmlFileModel xmlFileModel = parser.parse(file.getInputStream());
                xmlFileModel.setValidationMessages(parser.validate(file.getInputStream()));

                LOG.trace("     file: "+file.getOriginalFilename());
                xmlFileModel.setFileName(file.getOriginalFilename());
                return ResponseEntity
                        .ok()
                        .body(xmlFileModel);

            } catch (ParserConfigurationException e) {
                LOG.error(e);
            } catch (SAXException e) {
                LOG.error(e);
            } catch (IOException e) {
                LOG.error(e);
            }

            return null;

        } else {
            LOG.warn("\t File rejectet! contentType: " + file.getContentType());
            return ResponseEntity
                    .badRequest()
                    .body(null); //"You failed to upload " + name + " because the file was empty.";
        }
    }
    @RequestMapping(value="/validate", method=RequestMethod.POST)
    public @ResponseBody
    XmlFileModel validateXmlFile(@RequestBody XmlFileModel xmlFileModel) {
        LOG.info("==== XmlFileController VALIDATE");
        XmlWriter xmlWriter = new XmlWriter();
        xmlWriter.writeToXML(xmlFileModel);

        String xmlString = xmlWriter.writeToXML(xmlFileModel);

        byte[] xmlStringByteArray = xmlString.getBytes(StandardCharsets.UTF_8);

        InputStream stream = new ByteArrayInputStream(xmlStringByteArray);
        try {
            XmlParser parser = new XmlParser();
            xmlFileModel.setValidationMessages(parser.validate(stream));

            LOG.trace("     file: "+xmlFileModel.getFileName());
            return xmlFileModel;

        } catch (ParserConfigurationException e) {
            LOG.error(e);
        } catch (SAXException e) {
            LOG.error(e);
        } catch (IOException e) {
            LOG.error(e);
        }
        return null;
    }


    @RequestMapping(value="/download", method=RequestMethod.POST)
    public @ResponseBody
    ResponseEntity<byte[]> downloadXmlFile(@RequestBody XmlFileModel xmlFileModel) {
        LOG.info("==== XmlFileController DOWNLOAD");
        XmlWriter xmlWriter = new XmlWriter();
        xmlWriter.writeToXML(xmlFileModel);

        //ClassPathResource pdfFile = new ClassPathResource("pdf-sample.pdf");

        String xmlString = xmlWriter.writeToXML(xmlFileModel);

        byte[] xmlStringByteArray = xmlString.getBytes(StandardCharsets.UTF_8);

        return ResponseEntity
                .ok()
                .contentLength(xmlStringByteArray.length)
                .contentType(MediaType.APPLICATION_XML)
                .header("Content-Disposition", "attachment; filename = " + xmlFileModel.getFileName())
                .body(xmlStringByteArray);
    }
}
