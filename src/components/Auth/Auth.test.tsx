import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Auth } from "./Auth";

it("should error when username input is empty", async () => {
  render(<Auth />);
  
  const buttonLogIn = screen.getByRole("button", { name: /login/ });

  userEvent.click(buttonLogIn);

  expect(await screen.findByText(/This is required/)).toBeInTheDocument();
});

it("should error when username input is less 6 chars", async () => {
  render(<Auth />);
  const username = screen.getByLabelText(/Username/);
  const buttonLogIn = screen.getByRole("button", { name: /login/ });

  userEvent.type(username, "te");
  userEvent.click(buttonLogIn);

  expect(await screen.findByText(/length should be 6/)).toBeInTheDocument();
});

it("should error when username input is not latins or numbers", async () => {
  render(<Auth />);

  userEvent.type(screen.getByLabelText(/Username/), "выуыфввфы!");
  userEvent.click(screen.getByRole("button", { name: /login/ }));

  expect(
    await screen.findByText(/only latins and numbers/)
  ).toBeInTheDocument();

  userEvent.type(screen.getByLabelText(/Username/), "dsad2133!");
  userEvent.click(screen.getByRole("button", { name: /login/ }));

  await waitFor(() => expect(screen.queryByText(/Loading/i)).not.toBeInTheDocument());

  expect(
    await screen.findByText(/only latins and numbers/)
  ).toBeInTheDocument();
});
