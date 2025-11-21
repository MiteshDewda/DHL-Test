package com.postcode.demo.controller;
import com.postcode.demo.model.Coordinates;
import com.postcode.demo.model.DistanceResult;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.postcode.demo.service.PostcodeService;
import com.postcode.demo.util.DistanceCalculator;


@RestController
@RequestMapping("/api")
public class DistanceController {
   @Autowired
   private PostcodeService postcodeService;

   @GetMapping("/distance")
    public DistanceResult getDistance(@RequestParam String postcode1, @RequestParam String postcode2) {
       Coordinates c1 = postcodeService.getCoordinates(postcode1);
       Coordinates c2 = postcodeService.getCoordinates(postcode2);

       if( c1 == null || c2 == null )
       {
           throw new IllegalArgumentException("Invalid Postcode");
       }
       double distanceKm = DistanceCalculator.distanceKm(c1, c2);
       return new DistanceResult(postcode1, postcode2, distanceKm, "km");
   }
}
