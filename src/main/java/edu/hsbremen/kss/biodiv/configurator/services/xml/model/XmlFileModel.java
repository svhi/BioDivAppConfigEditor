package edu.hsbremen.kss.biodiv.configurator.services.xml.model;

import java.util.ArrayList;
import java.util.List;

/**
 * This is a model class representing an xml file.
 */
public class XmlFileModel {
    private String fileName;
    private XmlTagModel tag;

    private List<String> validationMessages;

    public XmlFileModel( String fileName){
        this.fileName = fileName;
    }

    public XmlFileModel() {
        this.validationMessages = new ArrayList<String>();
    }

    /**
     * Sets the name of this xml file.
     * @return
     */
    public String getFileName() {
        return fileName;
    }

    /**
     * Gets the name of this xml file.
     * @param fileName
     * @return
     */
    public XmlFileModel setFileName(String fileName) {
        this.fileName = fileName;
        return this;
    }

    /**
     * Gets the main tag of this xml file.
     * @return
     */
    public XmlTagModel getTag() {
        return tag;
    }

    /**
     * Sets the main tag of this xml file.
     * @param tag
     * @return
     */
    public XmlFileModel setTag(XmlTagModel tag) {
        this.tag = tag;
        return this;
    }

    /**
     * Adds a new Validation message.
     * @param message
     */
    public void addValidationMessage(String message) {
        this.validationMessages.add(message);
    }

    /**
     * Gets the list of validation messages associated with this xml file.
     * @return
     */
    public List<String> getValidationMessages() {
        return this.validationMessages;
    }

    /**
     * Sets the list of validation messages associated with this xml file.
     * @param msgs
     */
    public void setValidationMessages(List<String> msgs) {
        this.validationMessages = msgs;
    }
}
