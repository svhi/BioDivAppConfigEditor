package edu.hsbremen.kss.biodiv.configurator.services.xml;

import java.util.List;

/**
 * Created by Svenja on 22.06.2015.
 */
public class XmlFileModel {
    private String fileURL;
    private String fileName;
    private XmlTagModel tag;

    public XmlFileModel(String fileURL, String fileName){
        this.fileURL = fileURL;
        this.fileName = fileName;
    }

    public XmlFileModel() {

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
}
