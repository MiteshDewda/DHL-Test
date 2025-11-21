package com.postcode.demo.service;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.HashMap;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.postcode.demo.model.Coordinates;

import jakarta.annotation.PostConstruct;

@Service
public class PostcodeService {
    private Map<String, Coordinates> postcodeMap = new HashMap<>();

    @PostConstruct
    public void loadData() throws Exception {
        try (BufferedReader reader = new BufferedReader(new InputStreamReader(getClass().getResourceAsStream("/ukpostcodes.csv")))) {
            postcodeMap = reader.lines().skip(1) //skip header
                    .map(line -> line.split(","))
                    .filter(parts -> parts.length >= 3)
                    .collect(Collectors.toMap(parts -> parts[0], parts -> new Coordinates(parts[0],
                            Double.parseDouble(parts[1]),
                            Double.parseDouble(parts[2]))));
        }
    }

    public Coordinates getCoordinates(String postcode){
        return postcodeMap.get(postcode);
    }
}
