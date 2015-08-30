package edu.hsbremen.kss.biodiv.configurator.services.xml;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by Svenja on 22.06.2015.
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

    public String getqName() {
        return qName;
    }

    public void setqName(String qName) {
        this.qName = qName;
    }

    public String getValue() {
        return value;
    }

    public void setValue(String value) {
        this.value = value;
    }

    public void addSubTag(XmlTagModel xmlTagModel){
        this.getSubTags().add(xmlTagModel);
    }
    public void addAttribute(XmlAttributeModel xmlAttributeModel){
        this.getAttributes().add(xmlAttributeModel);
    }

    public List<XmlTagModel> getSubTags() {
        return subTags;
    }

    public void setSubTags(List<XmlTagModel> subTags) {
        this.subTags = subTags;
    }

    public List<XmlAttributeModel> getAttributes() {
        return attributes;
    }

    public void setAttributes(List<XmlAttributeModel> attributes) {
        this.attributes = attributes;
    }
}
