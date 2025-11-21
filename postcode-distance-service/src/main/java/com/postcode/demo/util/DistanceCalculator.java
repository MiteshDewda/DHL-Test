package com.postcode.demo.util;

import com.postcode.demo.model.Coordinates;

public final class DistanceCalculator {
    private static final double EARTH_RADIUS_KM = 6371; // radius of earth in KM

    public DistanceCalculator() {
    }

    public static double distanceKm(Coordinates a, Coordinates b){
        double lat1 = Math.toRadians(a.getLatitude());
        double lon1 = Math.toRadians(a.getLongitude());
        double lat2 = Math.toRadians(b.getLatitude());
        double lon2 = Math.toRadians(b.getLongitude());

        double dlat = lat2 - lat1;
        double dlon = lon2 - lon1;

        double sinLat = Math.sin(dlat / 2.0);
        double sinLon = Math.sin(dlon / 2.0);

        double h = sinLat * sinLat + Math.cos(lat2) * sinLon * sinLon;

        return EARTH_RADIUS_KM * 2.0 * Math.atan2(Math.sqrt(h), Math.sqrt(1.0 - h));
    }
}
