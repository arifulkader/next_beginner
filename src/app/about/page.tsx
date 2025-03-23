import { AspectRatio, Center } from "@chakra-ui/react"

export default function Demo() {
  return (
    <AspectRatio bg="bg.muted" ratio={2 / 1}>
      <Center fontSize="xl">This is About page</Center>
    </AspectRatio>
  )
}
