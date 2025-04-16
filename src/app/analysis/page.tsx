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
  HStack
} from '@chakra-ui/react';

var S3 = require('aws-sdk/clients/s3');
var s3 = new S3({
  apiVersion: '2006-03-01',
  region: 'us-west-1', 
  credentials: {YOUR_CREDENTIALS}
});


const VideoViewer = () => {
  const data = {
    id: 454,
    is_image: false,
    file_url: "upload/Track-1/Camera-2/trim_short_video_2.mp4",
    aws_external_id: 409030,
    uploaded_at: "06.36 AM, 16 Apr 2025",
    faces: [
      {
        id: 2613,
        face_url: "extracted_faces/037ff55c-57a6-4b74-98b8-87b3bc6c24ea.jpg",
        aws_face_id: "037ff55c-57a6-4b74-98b8-87b3bc6c24ea",
        aws_face_collection: "luge_collection"
      },
      {
        id: 2614,
        face_url: "extracted_faces/f7eac954-d1fc-4e44-8e81-dc43c3f422fc.jpg",
        aws_face_id: "f7eac954-d1fc-4e44-8e81-dc43c3f422fc",
        aws_face_collection: "luge_collection"
      },
      {
        id: 2615,
        face_url: "extracted_faces/e591b58e-7c35-407f-9621-b8f6510edb96.jpg",
        aws_face_id: "e591b58e-7c35-407f-9621-b8f6510edb96",
        aws_face_collection: "luge_collection"
      },
      {
        id: 2616,
        face_url: "extracted_faces/cf9128c2-a69b-4bb1-a260-b51a077c70a1.jpg",
        aws_face_id: "cf9128c2-a69b-4bb1-a260-b51a077c70a1",
        aws_face_collection: "luge_collection"
      },
      {
        id: 2617,
        face_url: "extracted_faces/90e0f5a4-e072-4c1c-ac9c-556b064667a0.jpg",
        aws_face_id: "90e0f5a4-e072-4c1c-ac9c-556b064667a0",
        aws_face_collection: "luge_collection"
      },
      {
        id: 2618,
        face_url: "extracted_faces/7184c083-3413-47e0-98b9-fc5d74f57da2.jpg",
        aws_face_id: "7184c083-3413-47e0-98b9-fc5d74f57da2",
        aws_face_collection: "luge_collection"
      },
      {
        id: 2619,
        face_url: "extracted_faces/0d2b1b32-335e-41b3-b360-a99e2a1bab33.jpg",
        aws_face_id: "0d2b1b32-335e-41b3-b360-a99e2a1bab33",
        aws_face_collection: "luge_collection"
      },
      {
        id: 2620,
        face_url: "extracted_faces/ea920082-fa77-40c6-be23-502bb043c3bb.jpg",
        aws_face_id: "ea920082-fa77-40c6-be23-502bb043c3bb",
        aws_face_collection: "luge_collection"
      }
    ],
    video_details: {
      id: 245,
      frame_count: 181,
      fps: 30,
      duration: 6,
      start_frame: 9,
      end_frame: 171,
      interval: 15,
      face_detected_frames: "24,39,54,69,84,99,129,144,159",
      file_size: 3.89
    }
  };

  return (
    <Box p={6}>
      <Heading as="h1" size="xl" mb={6}>
        Video Analysis
      </Heading>
      
      <Grid templateColumns={{ base: "1fr", md: "1fr 1fr" }} gap={8}>
        {/* Left Column - Video */}
        <GridItem>
          <VStack align="stretch" spacing={4}>
            <Box
              as="video"
              controls
              src={data.file_url}
              width="100%"
              borderRadius="md"
              boxShadow="md"
            />
            
            <Box p={4} borderWidth="1px" borderRadius="md">
              <Heading as="h2" size="md" mb={4}>
                Video Details
              </Heading>
              
              <VStack align="stretch" spacing={2}>
                <Flex justify="space-between">
                  <Text fontWeight="bold">Uploaded At:</Text>
                  <Text>{data.uploaded_at}</Text>
                </Flex>
                
                <Flex justify="space-between">
                  <Text fontWeight="bold">Duration:</Text>
                  <Text>{data.video_details.duration} seconds</Text>
                </Flex>
                
                <Flex justify="space-between">
                  <Text fontWeight="bold">Frames:</Text>
                  <Text>{data.video_details.frame_count} ({data.video_details.fps} FPS)</Text>
                </Flex>
                
                <Flex justify="space-between">
                  <Text fontWeight="bold">File Size:</Text>
                  <Text>{data.video_details.file_size} MB</Text>
                </Flex>
                
                <Flex justify="space-between">
                  <Text fontWeight="bold">Faces Detected:</Text>
                  <Text>{data.faces.length}</Text>
                </Flex>
                
                <Box mt={2}>
                  <Text fontWeight="bold" mb={1}>Detected Frames:</Text>
                  <HStack spacing={2} wrap="wrap">
                    {data.video_details.face_detected_frames.split(',').map((frame, index) => (
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
          <Box p={4} borderWidth="1px" borderRadius="md">
            <Heading as="h2" size="md" mb={4}>
              Extracted Faces ({data.faces.length})
            </Heading>
            
            <Grid
              templateColumns={{
                base: "repeat(2, 1fr)",
                md: "repeat(3, 1fr)",
                lg: "repeat(4, 1fr)"
              }}
              gap={4}
            >
              {data.faces.map((face) => (
                <Box
                  key={face.id}
                  borderWidth="1px"
                  borderRadius="md"
                  overflow="hidden"
                  boxShadow="sm"
                >
                  <Image
                    src={face.face_url}
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
        </GridItem>
      </Grid>
    </Box>
  );
};

export default VideoViewer;