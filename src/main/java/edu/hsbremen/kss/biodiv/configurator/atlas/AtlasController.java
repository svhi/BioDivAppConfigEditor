package edu.hsbremen.kss.biodiv.configurator.atlas;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/atlas")
public class AtlasController {

    @RequestMapping("")
    public @ResponseBody
    List<Atlas> get() {
        System.out.println("==== AtlasController");
        ArrayList<Atlas> atlasList = new ArrayList<>();
        atlasList.add(new Atlas(1, "Fischartenatlas", "http://www.fischartenatlas.de/cms2.0/"));
        atlasList.add(new Atlas(2, "Säugetieratlas", "http://www.hs-bremen.de/internet/de/studium/stg/istab/forschung/zoologie/proj/saeugeratlas/"));
        return atlasList;
    }
}
