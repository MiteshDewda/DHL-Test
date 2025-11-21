import React, {useState} from "react";

import { getDistance } from "../api/api";

function DistanceForm() {
    const [postcode1, setPostCode1] = useState("");
    const [postcode2, setPostCode2] = useState("");
    const [result, setResult] = useState(null);
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setResult(null);
        try
        {
            const data = await getDistance(postcode1, postcode2);
            setResult(data);
        } catch (err) {
            setError("Invlalid postcodes or server error");
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label>
                    Postcode 1:
                    <input type="text" value={postcode1}
                    onChange={e => setPostCode1(e.target.value)} 
                    required />
                </label>
                <br />
                <label>
                    Postcode 2:
                    <input type="text" value={postcode2}
                    onChange={e => setPostCode2(e.target.value)}
                    required />
                </label>
                <br />
                <button type="submit">Calculate Distance</button>
            </form>
            {error && <div style={{
                color: "red"
            }}>{error}</div>}
            {result && (
                <div>
                    Distance between<strong>{result.postcode1}</strong>
                    and <strong>{result.postcode2}</strong>:<br />
                    <strong>{result.distance} {result.unit}</strong>
                </div>
            )}
        </div>
    );
}

export default DistanceForm