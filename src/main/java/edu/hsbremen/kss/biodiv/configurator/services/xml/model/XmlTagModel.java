package edu.hsbremen.kss.biodiv.configurator.services.xml.model;

import java.util.ArrayList;
import java.util.List;

/**
 * This is a model class representing an xml tag.
 */
public class XmlTagModel {
    private String qName;
    private String value;
    private List<XmlTagModel> subTags;
    private List<XmlAttributeModel> attributes;

    public XmlTagModel(){
        this.setSubTags(new ArrayList<XmlTagModel>());
        this.setAttributes(new ArrayList<XmlAttributeModel>());
    }
    public XmlTagModel(String qName){
        this();
        this.qName = qName;
    }

    /**
     * Gets the qName.
     * @return
     */
    public String getqName() {
        return qName;
    }

    /**
     * Sets the qName
     * @param qName
     */
    public void setqName(String qName) {
        this.qName = qName;
    }

    /**
     * Gets the tags value.
     * @return
     */
    public String getValue() {
        return value;
    }

    /**
     * Sets the tags value.
     * @param value
     */
    public void setValue(String value) {
        this.value = value;
    }

    /**
     * Add a new sub tag to the xml tag.
     * @param xmlTagModel
     */
    public void addSubTag(XmlTagModel xmlTagModel){
        this.getSubTags().add(xmlTagModel);
    }

    /**
     * Adds a new attribute to the xml tag.
     * @param xmlAttributeModel
     */
    public void addAttribute(XmlAttributeModel xmlAttributeModel){
        this.getAttributes().add(xmlAttributeModel);
    }

    /**
     * Returns a list of subtags.
     * @return
     */
    public List<XmlTagModel> getSubTags() {
        return subTags;
    }

    /**
     * Sets the List of sub tags.
     * @param subTags
     */
    public void setSubTags(List<XmlTagModel> subTags) {
        this.subTags = subTags;
    }

    /**
     * Gets the list of attributes.
     * @return
     */
    public List<XmlAttributeModel> getAttributes() {
        return attributes;
    }

    /**
     * Sets the list of attributes.
     * @param attributes
     */
    public void setAttributes(List<XmlAttributeModel> attributes) {
        this.attributes = attributes;
    }
}
