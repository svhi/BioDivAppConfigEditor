package edu.hsbremen.kss.biodiv.configurator.services.xml;

import org.xml.sax.Attributes;
import org.xml.sax.SAXException;
import org.xml.sax.helpers.DefaultHandler;

import java.util.Stack;

/**
 * Created by Svenja on 22.06.2015.
 */
public class XmlParserHandler extends DefaultHandler {
    public XmlFileModel xmlFileModel;
    private Stack<XmlTagModel> currentTag;

    public void startDocument() {
        xmlFileModel = new XmlFileModel();
        currentTag = new Stack<XmlTagModel>();
    }
    public void endDocument() {
        xmlFileModel.setTags(currentTag.pop());
    }

    public void startElement(String uri, String localName,String qName,
                             Attributes attributes) throws SAXException {

        System.out.println(">> Start Element :" + qName);
        XmlTagModel element = new XmlTagModel(qName);
        //TODO: add attributes;
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

    public void endElement(String uri, String localName, String qName) throws SAXException {

        System.out.println("<< End Element :" + qName);
        if(currentTag.size() > 1) currentTag.pop();

    }

    public void characters(char ch[], int start, int length) throws SAXException {

        currentTag.peek().setValue(new String(ch).substring(start, start+length).trim());

    }
}
