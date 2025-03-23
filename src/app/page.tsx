import Image from "next/image";
import { AspectRatio, Center } from "@chakra-ui/react"

export default function Home() {
  return (
    <AspectRatio bg="bg.muted" ratio={2 / 1}>
      <Center fontSize="xl">Hello আবুল</Center>
    </AspectRatio>
  );
}
