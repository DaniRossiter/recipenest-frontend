import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import AddRecipePage from "../AddRecipePage";

beforeEach(() => {
  // Mock fetch for the POST request
  global.fetch = jest.fn(() =>
    Promise.resolve({
      ok: true,
      json: () => Promise.resolve({ message: "Recipe added" }),
    })
  );
});

afterEach(() => {
  jest.restoreAllMocks();
});

test("renders AddRecipe form and submits new recipe", async () => {
  render(
    <MemoryRouter initialEntries={["/add"]}>
      <AddRecipePage />
    </MemoryRouter>
  );

  // Fill in form fields
  fireEvent.change(screen.getByLabelText(/title/i), {
    target: { value: "Test Recipe" },
  });

  fireEvent.change(screen.getByLabelText(/description/i), {
    target: { value: "A delicious test recipe" },
  });

  fireEvent.change(screen.getByLabelText(/ingredients/i), {
    target: { value: "Test ingredient 1, Test ingredient 2" },
  });

  fireEvent.change(screen.getByLabelText(/instructions/i), {
    target: { value: "1. Mix. 2. Cook. 3. Serve." },
  });

  fireEvent.change(screen.getByLabelText(/image url/i), {
    target: { value: "http://example.com/test.jpg" },
  });

  // Submit the form
  fireEvent.click(screen.getByRole("button", { name: /add recipe/i }));

  // Assert fetch was called with correct method and body
  await waitFor(() => {
    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith(
      expect.stringContaining("/api/recipes"),
      expect.objectContaining({
        method: "POST",
        headers: expect.any(Object),
        body: JSON.stringify({
          title: "Test Recipe",
          description: "A delicious test recipe",
          ingredients: ["Test ingredient 1", "Test ingredient 2"],
          instructions: ["1. Mix. 2. Cook. 3. Serve."],
          imageUrl: "http://example.com/test.jpg",
        }),
      })
    );
  });
});
