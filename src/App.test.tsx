import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "./App";

it("should show modal when success login", async () => {
  render(<App />);

  userEvent.type(screen.getByLabelText(/username/i), "test_name");
  userEvent.type(screen.getByLabelText(/password/i), "qwerty123");
  userEvent.click(screen.getByRole("button", { name: /login/ }));

  await waitFor(() =>
    expect(screen.queryByText(/Loading/i)).not.toBeInTheDocument()
  );

  expect(screen.getByRole("status")).toHaveTextContent(/Login success/);
});
