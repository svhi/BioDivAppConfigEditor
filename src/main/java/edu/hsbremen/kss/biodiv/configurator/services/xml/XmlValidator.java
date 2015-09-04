package edu.hsbremen.kss.biodiv.configurator.services.xml;

import org.xml.sax.SAXException;

import javax.xml.XMLConstants;
import javax.xml.bind.annotation.XmlSchema;
import javax.xml.transform.Source;
import javax.xml.validation.Schema;
import javax.xml.validation.SchemaFactory;
import javax.xml.validation.Validator;
import java.io.File;
import java.io.IOException;
import java.net.URL;

/**
 * Created by Svenja on 04.09.2015.
 */
public class XmlValidator {
    public XmlValidator(){

    }

    public boolean validate(Source xml) throws SAXException, IOException {

        SchemaFactory sf = SchemaFactory.newInstance(XMLConstants.W3C_XML_SCHEMA_NS_URI);
        URL schemaURL = null;// The URL to your XML Schema;
        Schema schema = sf.newSchema(schemaURL);
        Validator validator = schema.newValidator();
        validator.validate(xml);
        return false;
    }
}
