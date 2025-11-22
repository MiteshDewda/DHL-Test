import { useState } from "react";
import { getDistance } from "../api/api";

const DistanceForm = () => {
    const [postcode1, setPostcode1] = useState("");
    const [postcode2, setPostcode2] = useState("");
    const [result, setResult] = useState(null);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setResult(null);
        setLoading(true);
        try {
            const data = await getDistance(postcode1, postcode2);
            setResult(data);
        } catch (err) {
            setError("Invalid postcodes or server error");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="distance-form-container">
            <form className="distance-form" onSubmit={handleSubmit} aria-label="Distance Calculator">
                <h2 className="form-title">Postcode Distance Calculator</h2>
                <div className="form-group">
                    <label htmlFor="postcode1" className="form-label">Postcode 1</label>
                    <input
                        id="postcode1"
                        className="form-input"
                        type="text"
                        value={postcode1}
                        onChange={e => setPostcode1(e.target.value)}
                        required
                        autoComplete="on"
                        placeholder="Enter first postcode"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="postcode2" className="form-label">Postcode 2</label>
                    <input
                        id="postcode2"
                        className="form-input"
                        type="text"
                        value={postcode2}
                        onChange={e => setPostcode2(e.target.value)}
                        required
                        autoComplete="on"
                        placeholder="Enter second postcode"
                    />
                </div>
                <button className="form-button" type="submit" disabled={loading}>
                    {loading ? "Calculating..." : "Calculate Distance"}
                </button>
            </form>
            {error && (
                <div className="form-error" role="alert">
                    {error}
                </div>
            )}
            {result && (
                <div className="form-result">
                    Distance between <strong>{result.postcode1}</strong> and <strong>{result.postcode2}</strong>:<br />
                    <strong>{result.distance} {result.unit}</strong>
                </div>
            )}
        </div>
    );
};

export default DistanceForm;