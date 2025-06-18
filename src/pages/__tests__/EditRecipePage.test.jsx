import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import EditRecipePage from "../EditRecipePage";
import { MemoryRouter } from "react-router-dom";

// Spy on console.log
beforeEach(() => {
  jest.spyOn(console, "log").mockImplementation(() => {});
});

afterEach(() => {
  jest.restoreAllMocks();
});

test("renders EditRecipePage with mock data and logs updated recipe", () => {
  render(
    <MemoryRouter>
      <EditRecipePage />
    </MemoryRouter>
  );

  // Check if the form is pre-filled
  expect(screen.getByDisplayValue("Mock title")).toBeInTheDocument();
  expect(screen.getByDisplayValue("Mock description for this recipe")).toBeInTheDocument();
  expect(screen.getByDisplayValue("https://via.placeholder.com/400x200")).toBeInTheDocument();

  // Change the title
  fireEvent.change(screen.getByPlaceholderText(/title/i), {
    target: { value: "Updated Title" },
  });

  // Submit the form
  fireEvent.click(screen.getByRole("button", { name: /update recipe/i }));

  // Assert that console.log is called with updated data
  expect(console.log).toHaveBeenCalledWith("Update this recipe with:", {
    title: "Updated Title",
    description: "Mock description for this recipe",
    ingredients: ["Mock ingredient 1", "Mock ingredient 2"],
    instructions: ["Mock step 1", "Mock step 2"],
    imageUrl: "https://via.placeholder.com/400x200",
  });
});

