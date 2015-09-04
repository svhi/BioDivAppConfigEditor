package edu.hsbremen.kss.biodiv.configurator.services.xml;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

/**
 * Created by Svenja on 22.06.2015.
 */
public class XmlFileModel {
    private String fileURL;
    private String fileName;
    private XmlTagModel tag;

    private ArrayList<String> validationMessages;

    public XmlFileModel(String fileURL, String fileName){
        this.fileURL = fileURL;
        this.fileName = fileName;
    }

    public XmlFileModel() {
        this.validationMessages = new ArrayList<String>();
    }

    public String getFileURL() {
        return fileURL;
    }

    public XmlFileModel setFileURL(String fileURL) {
        this.fileURL = fileURL;
        return this;
    }

    public String getFileName() {
        return fileName;
    }

    public XmlFileModel setFileName(String fileName) {
        this.fileName = fileName;
        return this;
    }

    public XmlTagModel getTag() {
        return tag;
    }

    public XmlFileModel setTag(XmlTagModel tag) {
        this.tag = tag;
        return this;
    }

    public void addValidationMessage(String message) {
        this.validationMessages.add(message);
    }
    public ArrayList<String> getValidationMessages() {
        return this.validationMessages;
    }

    public void setValidationMessages(ArrayList<String> msgs) {
        this.validationMessages = msgs;
    }
}
