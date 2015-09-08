package edu.hsbremen.kss.biodiv.configurator.services.xml.model;

/**
 * This is a model class representing an xml attribute.
 */
public class XmlAttributeModel {
    private String qName;
    private String value;


    public String getqName() {
        return qName;
    }

    public XmlAttributeModel setqName(String qName) {
        this.qName = qName;
        return this;
    }

    public String getValue() {
        return value;
    }

    public XmlAttributeModel setValue(String value) {
        this.value = value;
        return this;
    }
}
