import getAllAssets from "@/requests/all_assets"
import { AspectRatio, Center } from "@chakra-ui/react"
import { Accordion, Span } from "@chakra-ui/react"

export default async function Analysis() {
    const assets = await getAllAssets();
    // const ids = assets.map(asset => asset.id);
  return (
    <AspectRatio bg="bg.muted" ratio={2 / 1} >
      {/* <Center fontSize="xl">This is Analysis page</Center> */}

    <Accordion.Root collapsible defaultValue={["b"]} >
      <>
        {assets.map((item) => (
          <Accordion.Item key={item.id} value={item.id}>
            <Accordion.ItemTrigger>
              <Span flex="1">{item.file_url}</Span>
              <Accordion.ItemIndicator />
            </Accordion.ItemTrigger>
            <Accordion.ItemContent>
              <Accordion.ItemBody>{item.file_url}</Accordion.ItemBody>
            </Accordion.ItemContent>
          </Accordion.Item>
        ))}
      </>
    </Accordion.Root>
    </AspectRatio>
  )
}
