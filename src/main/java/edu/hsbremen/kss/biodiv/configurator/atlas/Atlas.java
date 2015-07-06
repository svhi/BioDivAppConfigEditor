package edu.hsbremen.kss.biodiv.configurator.atlas;

/**
 * Created by Svenja on 03.06.2015.
 */
public class Atlas {

    public Atlas(){

    }
    public Atlas(int id, String name, String url){
        this.id = id;
        this.name = name;
        this.url = url;
    }
    private int id;
    private String name;
    private String url;


    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }
}
