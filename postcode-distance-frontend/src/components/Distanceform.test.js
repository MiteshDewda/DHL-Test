import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import DistanceForm from "./Distanceform";

// Mock the getDistance API
jest.mock("../api/api", () => ({
  getDistance: jest.fn()
}));

import { getDistance } from "../api/api";

describe("DistanceForm", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders form inputs and button", () => {
    render(<DistanceForm />);
    expect(screen.getByLabelText(/Postcode 1/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Postcode 2/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Calculate Distance/i })).toBeInTheDocument();
  });

  it("shows loading state when submitting", async () => {
    getDistance.mockResolvedValueOnce({ postcode1: "A", postcode2: "B", distance: 10, unit: "km" });
    render(<DistanceForm />);
    fireEvent.change(screen.getByLabelText(/Postcode 1/i), { target: { value: "A" } });
    fireEvent.change(screen.getByLabelText(/Postcode 2/i), { target: { value: "B" } });
    fireEvent.click(screen.getByRole("button"));
    expect(screen.getByRole("button")).toHaveTextContent(/Calculating/i);
    await waitFor(() => expect(getDistance).toHaveBeenCalledWith("A", "B"));
  });

  it("shows result after successful API call", async () => {
    getDistance.mockResolvedValueOnce({ postcode1: "A", postcode2: "B", distance: 10, unit: "km" });
    render(<DistanceForm />);
    fireEvent.change(screen.getByLabelText(/Postcode 1/i), { target: { value: "A" } });
    fireEvent.change(screen.getByLabelText(/Postcode 2/i), { target: { value: "B" } });
    fireEvent.click(screen.getByRole("button"));
    await waitFor(() => {
      expect(screen.getByText(/Distance between/i)).toBeInTheDocument();
      expect(screen.getByText(/10 km/i)).toBeInTheDocument();
    });
  });

  it("shows error message on API failure", async () => {
    getDistance.mockRejectedValueOnce(new Error("API error"));
    render(<DistanceForm />);
    fireEvent.change(screen.getByLabelText(/Postcode 1/i), { target: { value: "A" } });
    fireEvent.change(screen.getByLabelText(/Postcode 2/i), { target: { value: "B" } });
    fireEvent.click(screen.getByRole("button"));
    await waitFor(() => {
      expect(screen.getByRole("alert")).toHaveTextContent(/Invalid postcodes or server error/i);
    });
  });
});
