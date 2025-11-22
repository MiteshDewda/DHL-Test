export async function getDistance(postcode1, postcode2){
    const response = await fetch(`/api/distance?postcode1=${encodeURIComponent(postcode1)}
    &postcode2=${encodeURIComponent(postcode2)}`);
    if (!response.ok) {
        throw new Error("Error fetching distance");
    }
    return await response.json()
}