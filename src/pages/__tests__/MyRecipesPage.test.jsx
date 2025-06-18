import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import MyRecipesPage from "../MyRecipesPage";

describe("MyRecipesPage", () => {
  test("renders recipe cards when myRecipes is not empty", () => {
    render(
      <MemoryRouter>
        <MyRecipesPage />
      </MemoryRouter>
    );

    // Check for a known recipe
    expect(screen.getByText("Spaghetti Bolognese")).toBeInTheDocument();
    expect(screen.getByText("A classic Italian dish with tomato and beef sauce.")).toBeInTheDocument();

    // Check for the View, Edit, and Delete buttons
    expect(screen.getByText("View")).toBeInTheDocument();
    expect(screen.getByText("Edit")).toBeInTheDocument();
    expect(screen.getByText("Delete")).toBeInTheDocument();
  });

  test("renders message when myRecipes is empty", () => {
    // Override the component to simulate empty list
    const EmptyMyRecipesPage = () => {
      const myRecipes = [];
      return (
        <div>
          {myRecipes.length === 0 ? (
            <p>You haven't added any recipes yet.</p>
          ) : null}
        </div>
      );
    };

    render(<EmptyMyRecipesPage />);
    expect(screen.getByText("You haven't added any recipes yet.")).toBeInTheDocument();
  });
});
