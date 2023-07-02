import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "./App";

it("should show modal when success login", async () => {
  render(<App />);

  userEvent.type(screen.getByLabelText(/username/i), "test_name");
  userEvent.type(screen.getByLabelText(/password/i), "qwerty123");
  userEvent.click(screen.getByRole("button", { name: /login/ }));

  expect(await screen.findByText(/Login success/)).toBeTruthy();
});
