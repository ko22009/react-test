import { useForm } from "react-hook-form";
import {
  FormErrorMessage,
  FormLabel,
  FormControl,
  Input,
  Button,
  Stack,
} from "@chakra-ui/react";
import { useState } from "react";

export interface LoginForm {
  username: string;
  password: string;
}

type AuthProps = {
  onSubmit: (values: LoginForm) => Promise<unknown>;
};

export const Auth = (props: AuthProps) => {
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<LoginForm>();
  const [isLoading, setIsLoading] = useState(false);

  function onSubmit(values: LoginForm) {
    setIsLoading(true);
    props.onSubmit(values).finally(() => setIsLoading(false));
    reset();
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormControl isInvalid={!!errors.username}>
        <FormLabel mr="0">
          Username
          <Input
            {...register("username", {
              required: "This is required",
              minLength: { value: 6, message: "Minimum length should be 6" },
              pattern: {
                value: /^[\w.-]{0,19}[0-9a-zA-Z]$/,
                message: "only latins and numbers",
              },
            })}
          />
        </FormLabel>
        <FormErrorMessage>
          {errors.username && errors.username.message}
        </FormErrorMessage>
      </FormControl>
      <FormControl isInvalid={!!errors.password}>
        <FormLabel mr="0">
          Password
          <Input
            {...register("password", {
              required: "This is required",
              minLength: { value: 6, message: "Password less than 6 chars" },
            })}
          />
        </FormLabel>
        <FormErrorMessage>
          {errors.password && errors.password.message}
        </FormErrorMessage>
      </FormControl>
      <Stack>
        <Button
          mt={4}
          colorScheme="teal"
          isLoading={isSubmitting || isLoading}
          type="submit"
        >
          login
        </Button>
      </Stack>
    </form>
  );
};
