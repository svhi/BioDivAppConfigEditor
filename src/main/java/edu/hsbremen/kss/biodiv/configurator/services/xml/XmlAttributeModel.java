package edu.hsbremen.kss.biodiv.configurator.services.xml;

/**
 * Created by Svenja on 22.06.2015.
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
