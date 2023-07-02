import { useForm } from 'react-hook-form';
import {
  FormErrorMessage,
  FormLabel,
  FormControl,
  Input,
  Button,
} from '@chakra-ui/react'

interface LoginForm {
  username: string;
}

export const Auth = () => {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<LoginForm>()

  async function onSubmit(values: LoginForm) {
    return new Promise((res) => setTimeout(() => res(values), 2000))
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormControl isInvalid={!!errors.username}>
        <FormLabel>Username
        <Input
          {...register('username', {
            required: 'This is required',
            minLength: { value: 6, message: 'Minimum length should be 6' },
            pattern: {
              value: /^[\w.-]{0,19}[0-9a-zA-Z]$/,
              message: 'only latins and numbers'
            }
          })}
        /></FormLabel>
        <FormErrorMessage>
          {errors.username && errors.username.message}
        </FormErrorMessage>
      </FormControl>
      <Button mt={4} colorScheme='teal' isLoading={isSubmitting} type='submit'>
        login
      </Button>
    </form>
  )
}