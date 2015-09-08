package edu.hsbremen.kss.biodiv.configurator.services.xml;

import edu.hsbremen.kss.biodiv.configurator.services.xml.model.XmlAttributeModel;
import edu.hsbremen.kss.biodiv.configurator.services.xml.model.XmlFileModel;
import edu.hsbremen.kss.biodiv.configurator.services.xml.model.XmlTagModel;
import org.apache.log4j.Logger;
import org.xml.sax.Attributes;
import org.xml.sax.SAXException;
import org.xml.sax.helpers.DefaultHandler;

import java.util.Stack;

/**
 * Takes care of creating a XmlFileModel based the xml file that is being parsed.
 */
public class XmlParserHandler extends DefaultHandler {

    private final Logger LOG = Logger.getLogger(XmlParserHandler.class.getName());

    public XmlFileModel xmlFileModel;
    private Stack<XmlTagModel> currentTag;

    @Override
    public void startDocument() {
        LOG.trace(">> Start Document");
        xmlFileModel = new XmlFileModel();
        currentTag = new Stack<XmlTagModel>();
    }

    @Override
    public void endDocument() {
        LOG.trace("<< End Document");
        xmlFileModel.setTag(currentTag.pop());
    }

    @Override
    public void startElement(String uri, String localName,String qName,
                             Attributes attributes) throws SAXException {
        LOG.trace("\t>> Start Element :" + qName);
        XmlTagModel element = new XmlTagModel(qName);

        for (int i = 0; i < attributes.getLength(); i++){
            element.addAttribute(new XmlAttributeModel()
                    .setqName(attributes.getQName(i))
                    .setValue(attributes.getValue(i)));
        }

        if(currentTag.size() >= 1){
            currentTag.peek().addSubTag(element);
        }
        currentTag.push(element);
    }

    @Override
    public void endElement(String uri, String localName, String qName) throws SAXException {
        LOG.trace("\t<< End Element :" + qName);
        if(currentTag.size() > 1) currentTag.pop();
    }

    @Override
    public void characters(char ch[], int start, int length) throws SAXException {
        LOG.trace("\t\t	Read Value");
        currentTag.peek().setValue(new String(ch).substring(start, start + length).trim());
    }
}
