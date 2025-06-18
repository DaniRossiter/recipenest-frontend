import React from "react";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import LandingPage from "../LandingPage";

describe("LandingPage", () => {
  test("renders welcome message", () => {
    render(
      <BrowserRouter>
        <LandingPage />
      </BrowserRouter>
    );

    expect(screen.getByText(/welcome to recipenest/i)).toBeInTheDocument();
  });
});

