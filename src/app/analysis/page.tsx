import React from 'react';
import {
  Box,
  Flex,
  Grid,
  GridItem,
  Image,
  Text,
  VStack,
  Heading,
  Badge,
  HStack,
  Tabs
} from '@chakra-ui/react';
import { LuUser } from "react-icons/lu"

import getAllAssets from "@/requests/all_assets";
import extractFrame from "@/requests/extract_frame";



const VideoViewer = async () => {


  const assets = await getAllAssets();

  // function_parmeters ={}
  // assets.map((asset) => {
  // function_parmeters.append({video_id:asset.id,video_url:`https://d2evpwttj2qwd3.cloudfront.net/${asset.file_url}`,frame_numbers:asset.video_details.face_detected_frames})
  // )}
  const function_parameters = assets.map((asset) => ({
    video_id: asset.id,
    video_url: `https://d2evpwttj2qwd3.cloudfront.net/${asset.file_url}`,
    frame_numbers: asset.video_details.face_detected_frames,
  }));

  // console.log('function_parameters:', typeof function_parameters);
  // console.log('function_parameters:', function_parameters);

  const responses = await extractFrame([{
    "video_id": 454,
    "video_url": `https://d2evpwttj2qwd3.cloudfront.net/upload/Track-1/Camera-2/trim_short_video_2.mp4`,
    "frame_numbers": "24,39,54,69,84,99,129,144,159"}])

  console.log('responses:', responses);



  return (
    <Box p={6}>

      {assets.map((asset) => (
        <div key={asset.id}>
          <Heading as="h1" size="xl" mb={6}>
            Video Analysis : {asset.id}
          </Heading>

          <Grid templateColumns={{ base: "1fr", md: "1fr 1fr" }} gap={8}>
            {/* Left Column - Video */}
            <GridItem>
              <VStack align="stretch" >
                <Box borderRadius="md" boxShadow="md" overflow="hidden">
                  <video
                    src={'https://d2evpwttj2qwd3.cloudfront.net/' + asset.file_url}
                    width="100%"
                    controls
                  />
                </Box>

                <Box p={4} borderWidth="1px" borderRadius="md">
                  <Heading as="h2" size="md" mb={4}>
                    Video Details
                  </Heading>

                  <VStack align="stretch" >
                    <Flex justify="space-between">
                      <Text fontWeight="bold">Uploaded At:</Text>
                      <Text>{asset.uploaded_at}</Text>
                    </Flex>

                    <Flex justify="space-between">
                      <Text fontWeight="bold">Duration:</Text>
                      <Text>{asset.video_details.duration} seconds</Text>
                    </Flex>

                    <Flex justify="space-between">
                      <Text fontWeight="bold">Frames:</Text>
                      <Text>{asset.video_details.frame_count} ({asset.video_details.fps} FPS)</Text>
                    </Flex>

                    <Flex justify="space-between">
                      <Text fontWeight="bold">File Size:</Text>
                      <Text>{asset.video_details.file_size} MB</Text>
                    </Flex>

                    <Flex justify="space-between">
                      <Text fontWeight="bold">Faces Detected:</Text>
                      <Text>{asset.faces.length}</Text>
                    </Flex>

                    <Box mt={2}>
                      <Text fontWeight="bold" mb={1}>Detected Frames:</Text>
                      <HStack spacing={2} wrap="wrap">
                        {asset.video_details.face_detected_frames.split(',').map((frame, index) => (
                          <Badge key={index} colorScheme="blue">
                            {frame}
                          </Badge>
                        ))}
                      </HStack>
                    </Box>
                  </VStack>
                </Box>
              </VStack>
            </GridItem>

            {/* Right Column - Faces */}
            <GridItem>
              <Tabs.Root key="enclosed" defaultValue="Extracted Faces" variant="enclosed">
                <Tabs.List>
                  <Tabs.Trigger value="Extracted Faces">
                    <LuUser />
                    Extracted Faces
                  </Tabs.Trigger>
                  <Tabs.Trigger value="Detected Frames">
                    <LuUser />
                    Detected Frames
                  </Tabs.Trigger>
                </Tabs.List>

                <Tabs.Content value="Extracted Faces">
                  <Box p={4} borderWidth="1px" borderRadius="md">
                    <Heading as="h2" size="md" mb={4}>
                      Extracted Faces ({asset.faces.length})
                    </Heading>

                    <Grid
                      templateColumns={{
                        base: "repeat(2, 1fr)",
                        md: "repeat(3, 1fr)",
                        lg: "repeat(4, 1fr)",
                      }}
                      gap={4}
                    >
                      {asset.faces.map((face) => (
                        <Box
                          key={face.id}
                          borderWidth="1px"
                          borderRadius="md"
                          overflow="hidden"
                          boxShadow="sm"
                        >
                          <Image
                            src={
                              "https://d2evpwttj2qwd3.cloudfront.net/" +
                              face.face_url
                            }
                            alt={`Face ${face.id}`}
                            objectFit="cover"
                            width="100%"
                            height="150px"
                          />
                          <Box p={2}>
                            <Text fontSize="sm" isTruncated>
                              ID: {face.aws_face_id}
                            </Text>
                          </Box>
                        </Box>
                      ))}
                    </Grid>
                  </Box>
                </Tabs.Content>

                <Tabs.Content value="Detected Faces">
                  <Box p={4} borderWidth="1px" borderRadius="md">
                    <Heading as="h2" size="md" mb={4}>
                      Detected Faces
                    </Heading>

                    <Grid
                      templateColumns={{
                        base: "repeat(2, 1fr)",
                        md: "repeat(3, 1fr)",
                        lg: "repeat(4, 1fr)",
                      }}
                      gap={4}
                    >
                      {asset.video_details.face_detected_frames
                        .split(',')
                        .map((frame, index) => (
                          <Box
                            key={index}
                            borderWidth="1px"
                            borderRadius="md"
                            overflow="hidden"
                            boxShadow="sm"
                          >
                            <Image
                              src="https://d2evpwttj2qwd3.cloudfront.net/upload/Track-1/Camera-2/trim_short_video_2.mp4#t=99"
                              alt={`Frame ${frame}`}
                              objectFit="cover"
                              width="100%"
                              height="150px"
                            />
                            <Box p={2}>
                              <Text fontSize="sm" isTruncated>
                                Frame: {frame}
                              </Text>
                            </Box>
                          </Box>
                        ))}
                    </Grid>
                  </Box>
                </Tabs.Content>

              </Tabs.Root>
            </GridItem>
          </Grid>

        </div>
      ))}

    </Box>
  );
};

export default VideoViewer;