package edu.hsbremen.kss.biodiv.configurator.services.xml;

import org.xml.sax.Attributes;
import org.xml.sax.SAXException;
import org.xml.sax.SAXParseException;
import org.xml.sax.helpers.DefaultHandler;

import java.util.ArrayList;
import java.util.Stack;

/**
 * Created by Svenja on 22.06.2015.
 */
public class XmlValidationParserHandler extends DefaultHandler {


    public ArrayList<String> validationMessages;

    public XmlValidationParserHandler(){
        this.validationMessages = new ArrayList<String>();
    }

    @Override
    public void warning(SAXParseException spe) throws SAXException {
        String message = "Warning: \n\t" + getParseExceptionInfo(spe);
        this.validationMessages.add(message);
        System.out.println(message);
    }

    @Override
    public void error(SAXParseException spe) throws SAXException {
        String message = "Error: \n\t" + getParseExceptionInfo(spe);
        this.validationMessages.add(message);
        System.out.println(message);
        //throw new SAXException(message);
    }

    @Override
    public void fatalError(SAXParseException spe) throws SAXException {
        String message = "Fatal Error: " + getParseExceptionInfo(spe);
        throw new SAXException(message);
    }

    private String getParseExceptionInfo(SAXParseException spe) {
        String info = "Line="
                + spe.getLineNumber() + ": " + spe.getLocalizedMessage();

        return info;
    }


}
