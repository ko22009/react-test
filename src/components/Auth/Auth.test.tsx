import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Auth } from "./Auth";

it("should error when username input is empty", async () => {
  const onSubmit = jest.fn();
  render(<Auth onSubmit={onSubmit} />);

  userEvent.click(screen.getByRole("button", { name: /login/ }));

  await waitFor(() =>
    expect(screen.queryByText(/Loading/i)).not.toBeInTheDocument()
  );

  expect(
    screen.getByRole("textbox", { name: /username/i })
  ).toHaveAccessibleDescription(/This is required/);
});

it("should error when username input is less 6 chars", async () => {
  const onSubmit = jest.fn();
  render(<Auth onSubmit={onSubmit} />);

  userEvent.type(screen.getByRole("textbox", { name: /username/i }), "te");
  userEvent.click(screen.getByRole("button", { name: /login/ }));

  await waitFor(() =>
    expect(screen.queryByText(/Loading/i)).not.toBeInTheDocument()
  );

  expect(
    screen.getByRole("textbox", { name: /username/i })
  ).toHaveAccessibleDescription(/length should be 6/);
});

it("should error when username input is not latins or numbers", async () => {
  const onSubmit = jest.fn();
  render(<Auth onSubmit={onSubmit} />);

  userEvent.type(
    screen.getByRole("textbox", { name: /username/i }),
    "выуыфввфы!"
  );
  userEvent.click(screen.getByRole("button", { name: /login/ }));

  await waitFor(() =>
    expect(screen.queryByText(/Loading/i)).not.toBeInTheDocument()
  );

  expect(
    screen.getByRole("textbox", { name: /username/i })
  ).toHaveAccessibleDescription(/only latins and numbers/);

  userEvent.type(
    screen.getByRole("textbox", { name: /username/i }),
    "dsad2133!"
  );
  userEvent.click(screen.getByRole("button", { name: /login/ }));

  await waitFor(() =>
    expect(screen.queryByText(/Loading/i)).not.toBeInTheDocument()
  );

  expect(
    screen.getByRole("textbox", { name: /username/i })
  ).toHaveAccessibleDescription(/only latins and numbers/);
});

it("should error when password less 6 chars and onSubmit no calling", async () => {
  const onSubmit = jest.fn();
  render(<Auth onSubmit={onSubmit} />);

  userEvent.type(screen.getByLabelText(/password/i), "ds");
  userEvent.click(screen.getByRole("button", { name: /login/ }));

  await waitFor(() =>
    expect(screen.queryByText(/Loading/i)).not.toBeInTheDocument()
  );

  expect(
    screen.getByRole("textbox", { name: /password/i })
  ).toHaveAccessibleDescription(/password less than 6 chars/i);
  expect(onSubmit).not.toBeCalled();
});

it("should call submit when pass correct data", async () => {
  const onSubmit = jest.fn();
  onSubmit.mockImplementation(() => ({ finally: jest.fn() }));
  render(<Auth onSubmit={onSubmit} />);

  userEvent.type(screen.getByLabelText(/username/i), "test_name");
  userEvent.type(screen.getByLabelText(/password/i), "qwerty123");
  userEvent.click(screen.getByRole("button", { name: /login/ }));

  await waitFor(() => expect(onSubmit).toBeCalled());
});
