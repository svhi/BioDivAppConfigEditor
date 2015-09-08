package edu.hsbremen.kss.biodiv.configurator.services.xml;

import org.apache.log4j.Logger;
import org.xml.sax.SAXException;
import org.xml.sax.SAXParseException;
import org.xml.sax.helpers.DefaultHandler;

import java.util.ArrayList;

/**
 * Takes care of saving all validation messages to an array based the xml file that is being parsed.
 */
public class XmlValidationParserHandler extends DefaultHandler {

    private final Logger LOG = Logger.getLogger(XmlValidationParserHandler.class.getName());

    public ArrayList<String> validationMessages;

    public XmlValidationParserHandler(){
        this.validationMessages = new ArrayList<String>();
    }

    @Override
    public void warning(SAXParseException spe) throws SAXException {
        String message = "Warning: \n\t" + getParseExceptionInfo(spe);
        this.validationMessages.add(message);
        //System.out.println(message);
    }

    @Override
    public void error(SAXParseException spe) throws SAXException {
        String message = "Error: \n\t" + getParseExceptionInfo(spe);
        this.validationMessages.add(message);
        //System.out.println(message);
        //throw new SAXException(message);
    }

    @Override
    public void fatalError(SAXParseException spe) throws SAXException {
        String message = "Fatal Error: " + getParseExceptionInfo(spe);
        throw new SAXException(message);
    }

    private String getParseExceptionInfo(SAXParseException spe) {
        String info = "Line="
                + spe.getLineNumber() + ": " + spe.getMessage();

        return info;
    }


}
