import { render, screen } from "@testing-library/react";
import AppRowCard from "./AppRowCard";
import { AppItem } from "../types/appTypes";

const app: AppItem = {
  id: "1",
  name: "Test App",
  icon: "https://via.placeholder.com/150",
  category: "Test Category",
};

test("renders app card with app name", () => {
  render(<AppRowCard app={app} index={0} />);
  const appNameElement = screen.getByText(/Test App/i);
  expect(appNameElement).toBeInTheDocument();
});

test("renders app card with app category", () => {
  render(<AppRowCard app={app} index={1} />);
  const appCategoryElement = screen.getByText(/Test Category/i);
  expect(appCategoryElement).toBeInTheDocument();
});
