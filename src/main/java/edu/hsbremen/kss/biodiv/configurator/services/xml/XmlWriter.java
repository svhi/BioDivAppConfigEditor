package edu.hsbremen.kss.biodiv.configurator.services.xml;


import javax.xml.stream.XMLOutputFactory;
import javax.xml.stream.XMLStreamException;
import javax.xml.stream.XMLStreamWriter;
import java.io.File;
import java.io.IOException;
import java.io.StringWriter;


public class XmlWriter {


        public XmlWriter() {

        }

        public File  writeToXMLFile(XmlFileModel model) {
            String xmlString = this.writeToXML(model);
            File file = new File(xmlString);

            return file;
        }

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
                System.out.println(xmlString);

            } catch (XMLStreamException e) {
                e.printStackTrace();
            } catch (IOException e) {
                e.printStackTrace();
            }

            return xmlString;
        }

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
                e.printStackTrace();
            }


        }
        private void writeXmlAttributes( XMLStreamWriter xmlStreamWriter, XmlTagModel tag){
            try {
                for(XmlAttributeModel attr : tag.getAttributes()){
                    xmlStreamWriter.writeAttribute(attr.getqName(), attr.getValue());
                }
            } catch (XMLStreamException e) {
                e.printStackTrace();
            }


        }

}
