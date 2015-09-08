package edu.hsbremen.kss.biodiv.configurator.services.xml;


import edu.hsbremen.kss.biodiv.configurator.services.xml.model.XmlAttributeModel;
import edu.hsbremen.kss.biodiv.configurator.services.xml.model.XmlFileModel;
import edu.hsbremen.kss.biodiv.configurator.services.xml.model.XmlTagModel;
import org.apache.log4j.Logger;

import javax.xml.stream.XMLOutputFactory;
import javax.xml.stream.XMLStreamException;
import javax.xml.stream.XMLStreamWriter;
import java.io.File;
import java.io.IOException;
import java.io.StringWriter;

/**
 * XmlWriter
 */
public class XmlWriter {

    private final Logger LOG = Logger.getLogger(XmlWriter.class.getName());


    public XmlWriter() {

    }

    public File  writeToXMLFile(XmlFileModel model) {
        String xmlString = this.writeToXML(model);
        File file = new File(xmlString);

        return file;
    }

    /**
     * Writes a xml structur with basic formatting based an the given XmlFileModel.
     */
    public String  writeToXML(XmlFileModel model) {

        String xmlString = null;
        try {
            StringWriter stringWriter = new StringWriter();

            XMLOutputFactory xmlOutputFactory = XMLOutputFactory.newInstance();
            XMLStreamWriter xmlStreamWriter = xmlOutputFactory.createXMLStreamWriter(stringWriter);

            xmlStreamWriter.writeStartDocument("utf-8", "1.0");

            this.writeXmlTag(xmlStreamWriter, model.getTag(), "");

            xmlStreamWriter.writeCharacters("\n");
            xmlStreamWriter.writeEndDocument();
            xmlStreamWriter.flush();
            xmlStreamWriter.close();

            xmlString = stringWriter.getBuffer().toString();
            stringWriter.close();
            //System.out.println(xmlString);

        } catch (XMLStreamException e) {
            LOG.error(e);
        } catch (IOException e) {
            LOG.error(e);
        }

        return xmlString;
    }

    /**
     * Writes a xml structur with basic formatting based an the given XmlTagModel.
     */
    private void writeXmlTag( XMLStreamWriter xmlStreamWriter, XmlTagModel tag, String spacer){
        try {
            xmlStreamWriter.writeCharacters("\n");
            xmlStreamWriter.writeCharacters(spacer);
            xmlStreamWriter.writeStartElement(tag.getqName());
            this.writeXmlAttributes(xmlStreamWriter, tag);

            String tagValue = tag.getValue();
            if(tagValue != null && !tagValue.isEmpty() && !tagValue.trim().isEmpty()){
                xmlStreamWriter.writeCharacters(tagValue);
            }else{
                for(XmlTagModel subTag : tag.getSubTags()){

                    this.writeXmlTag(xmlStreamWriter, subTag, spacer+"   ");
                }
                xmlStreamWriter.writeCharacters("\n");
                xmlStreamWriter.writeCharacters(spacer);
            }

            xmlStreamWriter.writeEndElement();
        } catch (XMLStreamException e) {
            LOG.error(e);
        }


    }

    /**
     * Writes the xml attributes with basic formatting based an the given XmlTagModel.
     */
    private void writeXmlAttributes( XMLStreamWriter xmlStreamWriter, XmlTagModel tag){
        try {
            for(XmlAttributeModel attr : tag.getAttributes()){
                xmlStreamWriter.writeAttribute(attr.getqName(), attr.getValue()==null ? "" : attr.getValue() );
            }
        } catch (XMLStreamException e) {
            e.printStackTrace();
        }


    }

}
