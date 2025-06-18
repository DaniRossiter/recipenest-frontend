import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import RecipeListPage from "../RecipeListPage";

beforeEach(() => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      ok: true,
      json: () =>
        Promise.resolve([
          { id: 1, title: "Spaghetti Bolognese" },
          { id: 2, title: "Chicken Curry" },
        ]),
    })
  );
});

afterEach(() => {
  jest.restoreAllMocks();
});

test("renders recipe titles from backend", async () => {
  render(
    <BrowserRouter>
      <RecipeListPage />
    </BrowserRouter>
  );

  await waitFor(() => {
    expect(screen.getByText(/spaghetti bolognese/i)).toBeInTheDocument();
    expect(screen.getByText(/chicken curry/i)).toBeInTheDocument();
  });
});


