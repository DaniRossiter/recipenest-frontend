import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import RecipeDetailPage from "../RecipeDetailPage";

// Mock fetch
beforeEach(() => {
    jest.spyOn(global, "fetch").mockResolvedValueOnce({
        ok: true,
    json: async () => ({
        id: 1,
        title: "Spaghetti Bolognese",
        description: "A hearty tomato and meat sauce",
        ingredients: ["Spaghetti", "Beef mince", "Onion", "Garlic", "Tomato paste"],
        instructions: "1. Boil pasta according to package instructions. 2. Sauté onion and garlic until fragrant. 3. Add beef and brown. 4. Stir in tomato paste and simmer. 5. Combine with drained pasta and serve.",
        image_url: "https://example.com/image.jpg"
  }),
});

});

afterEach(() => {
  jest.restoreAllMocks();
});

test("renders recipe details correctly", async () => {
  render(
    <MemoryRouter initialEntries={["/recipes/1"]}>
      <Routes>
        <Route path="/recipes/:id" element={<RecipeDetailPage />} />
      </Routes>
    </MemoryRouter>
  );

  await waitFor(() => {
  expect(screen.getByText(/spaghetti bolognese/i)).toBeInTheDocument();
  expect(screen.getByText(/a hearty tomato and meat sauce/i)).toBeInTheDocument();
  expect(screen.getByText(/boil pasta/i)).toBeInTheDocument();
});
});
