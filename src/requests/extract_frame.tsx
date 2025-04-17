// pages/api/extract-frame.ts
import ffmpeg from 'fluent-ffmpeg';

//  expected_argument = [{"video_id:"23,"video_url:"https://example.com/video.mp4","frame_numbers":"1,2,3,4"},]  
// expected_return =[{"vide_id_23":[12_frames,13_frames,14_frames,15_frames]}] 

export default async function extractFrames(
    requests: {
        video_id: number;
        video_url: string;
        frame_numbers: string;
    }[]
): Promise<Array<{ [key: string]: Buffer[] }>> {
    if (!requests || !requests.length) {
        throw new Error('No video requests provided');
    }

    const requestArray = Array.isArray(requests) ? requests : [requests];

    console.log('Requests type:', typeof requestArray); // Should show "object" (arrays are objects in JS)
    console.log('Is array:', Array.isArray(requestArray)); // Should show true
    console.log('Requests count:', requestArray.length);

    if (!requestArray.length) {
        throw new Error('No video requests provided');
    };

    try {
        const results = await Promise.all(
            requests.map(async (request) => {
                const { video_id, video_url, frame_numbers } = request;

                if (!video_id || !video_url || !frame_numbers) {
                    throw new Error('Missing video_id, video_url, or frame_numbers in one of the requests');
                }

                const frameNumbers = frame_numbers.split(',').map(num => parseInt(num.trim()));
                
                const frames = await Promise.all(
                    frameNumbers.map(frame_number => {
                        return new Promise<Buffer>((resolve, reject) => {
                            const chunks: Buffer[] = [];

                            ffmpeg(video_url)
                                .seekInput(Number(frame_number) / 30) // Assuming 30fps
                                .frames(1)
                                .outputOptions('-f', 'image2pipe', '-vcodec', 'png') // Ensure output is a PNG image
                                .on('error', reject)
                                .on('end', () => resolve(Buffer.concat(chunks))) // Combine all chunks into a single buffer
                                .pipe()
                                .on('data', (chunk) => chunks.push(chunk)); // Collect data chunks
                        });
                    })
                );

                return { [`video_id_${video_id}`]: frames };
            })
        );

        return results;
    } catch (error) {
        console.error('Frame extraction error:', error);
        throw new Error('Frame extraction failed');
    }
}