package com.postcode.demo.model;

public class DistanceResult {
    private String postcode1;
    private String postcode2;
    private double distance;
    private String unit;

    public DistanceResult(String postcode1, String postcode2, double distance, String unit) {
        this.postcode1 = postcode1;
        this.postcode2 = postcode2;
        this.distance = distance;
        this.unit = unit;
    }

    public String getPostcode2() {
        return postcode2;
    }

    public void setPostcode2(String postcode2) {
        this.postcode2 = postcode2;
    }

    public double getDistance() {
        return distance;
    }

    public void setDistance(double distance) {
        this.distance = distance;
    }

    public String getPostcode1() {
        return postcode1;
    }

    public void setPostcode1(String postcode1) {
        this.postcode1 = postcode1;
    }

    public String getUnit() {
        return unit;
    }

    public void setUnit(String unit) {
        this.unit = unit;
    }
}
