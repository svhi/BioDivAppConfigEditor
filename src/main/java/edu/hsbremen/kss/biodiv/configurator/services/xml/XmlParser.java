package edu.hsbremen.kss.biodiv.configurator.services.xml;

import javax.xml.parsers.ParserConfigurationException;
import javax.xml.parsers.SAXParser;
import javax.xml.parsers.SAXParserFactory;
import org.xml.sax.SAXException;
import org.xml.sax.helpers.DefaultHandler;
import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;


public class XmlParser {

        static final String JAXP_SCHEMA_LANGUAGE =
                "http://java.sun.com/xml/jaxp/properties/schemaLanguage";

        static final String W3C_XML_SCHEMA =
                "http://www.w3.org/2001/XMLSchema";

        static final String JAXP_SCHEMA_SOURCE =
                "http://java.sun.com/xml/jaxp/properties/schemaSource";

        private SAXParser saxParser;
        private SAXParser validatingSaxParser;


        public XmlParser() throws ParserConfigurationException, SAXException {
            SAXParserFactory factory = SAXParserFactory.newInstance();

            this.saxParser = factory.newSAXParser();



            factory.setValidating(true);
            factory.setNamespaceAware(true);

            this.validatingSaxParser = factory.newSAXParser();
            validatingSaxParser.setProperty(JAXP_SCHEMA_LANGUAGE, W3C_XML_SCHEMA);
        }

        public XmlFileModel parse(File file) throws IOException, SAXException, ParserConfigurationException {
            XmlFileModel xmlFileModel = null;

            XmlParserHandler handler   = new XmlParserHandler();
            this.saxParser.parse(file, handler);
            xmlFileModel = handler.xmlFileModel;

            XmlValidationParserHandler validationHandler   = new XmlValidationParserHandler();
            this.validatingSaxParser.parse(file, validationHandler);
            xmlFileModel.setValidationMessages(validationHandler.validationMessages);

            return xmlFileModel;
        }
        public XmlFileModel parse(InputStream file) throws IOException, SAXException, ParserConfigurationException {
            XmlFileModel xmlFileModel = null;

            XmlParserHandler handler   = new XmlParserHandler();
            this.saxParser.parse(file, handler);
            xmlFileModel = handler.xmlFileModel;

            return xmlFileModel;
        }

        public ArrayList<String> validate(InputStream file) throws IOException, SAXException, ParserConfigurationException {

            XmlValidationParserHandler validationHandler   = new XmlValidationParserHandler();
            this.validatingSaxParser.parse(file, validationHandler);

            return validationHandler.validationMessages;
        }
}
