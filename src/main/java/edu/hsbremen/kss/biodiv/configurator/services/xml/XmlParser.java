package edu.hsbremen.kss.biodiv.configurator.services.xml;

import javax.xml.parsers.ParserConfigurationException;
import javax.xml.parsers.SAXParser;
import javax.xml.parsers.SAXParserFactory;
import org.xml.sax.SAXException;
import org.xml.sax.helpers.DefaultHandler;
import java.io.File;
import java.io.IOException;
import java.io.InputStream;


public class XmlParser {

        private SAXParser saxParser;

        public XmlParser() throws ParserConfigurationException, SAXException {
            SAXParserFactory factory = SAXParserFactory.newInstance();
            this.saxParser = factory.newSAXParser();
        }

        public XmlFileModel parse(File file) throws IOException, SAXException, ParserConfigurationException {
            XmlParserHandler handler   = new XmlParserHandler();
            this.saxParser.parse(file, handler);

            return handler.xmlFileModel;
        }
        public XmlFileModel parse(InputStream file) throws IOException, SAXException, ParserConfigurationException {
            XmlParserHandler handler   = new XmlParserHandler();
            this.saxParser.parse(file, handler);

            return handler.xmlFileModel;
        }
}
