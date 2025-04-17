export interface Asset {
    id: string;
    is_image: boolean;
    file_url: string;
    uploaded_at:string;
    faces: Array<any>;
    video_details: {
        id: number;
        frame_count: number;
        fps: number;
        duration: number;
        start_frame: number;
        end_frame: number;
        interval: number;
        face_detected_frames: string;
        file_size: number;
    }
    // Add other fields based on the API response
}

export default async function getAllAssets(): Promise<Asset[]> {
    const result = await fetch(
        "https://x5fpoikdj4.execute-api.ap-southeast-1.amazonaws.com/Prod/assets?skip=0&limit=10&only_video=true&only_image=false",
        {
            next: {
                revalidate: 10,
            },
        }
    );

    if (!result.ok) {
        throw new Error("There was an error fetching assets");
    }

    return result.json();
}