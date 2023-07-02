import {
  ChakraProvider,
  Flex,
  Center,
  Box,
  Heading,
  Stack,
  useToast,
} from "@chakra-ui/react";
import { Auth, LoginForm } from "./components/Auth";

function App() {
  const toast = useToast();
  async function onSubmit(values: LoginForm) {
    return new Promise((res) =>
      setTimeout(() => {
        toast({
          title: "Login",
          description: "Login success",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        res(values);
      }, 200)
    );
  }

  return (
    <ChakraProvider>
      <Flex
        width={"100vw"}
        height={"100vh"}
        alignContent={"center"}
        justifyContent={"center"}
      >
        <Center flexDirection={"column"}>
          <Stack textAlign="center" mb="6">
            <Heading>Log in to your account</Heading>
          </Stack>
          <Box
            py={{ base: "0", sm: "8" }}
            px={{ base: "4", sm: "10" }}
            bg={{ base: "transparent", sm: "bg.surface" }}
            boxShadow={{ base: "none", sm: "md" }}
            borderRadius={{ base: "sm", sm: "xl" }}
            borderWidth="1px"
          >
            <Auth onSubmit={onSubmit} />
          </Box>
        </Center>
      </Flex>
    </ChakraProvider>
  );
}

export default App;
