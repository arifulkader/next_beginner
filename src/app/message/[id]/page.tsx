
import Image from "next/image";
import { Box , Center } from "@chakra-ui/react"

interface SingleMessageProps {
  params: {
    id: string;
  };
}

export default async function SingleMessage({ params }: SingleMessageProps) {
  const { id } = await params;
  return (
    <Box padding="4" width="100%">
      <Center fontSize="xl">Query id : {id}</Center>
    </Box>
  );
}
