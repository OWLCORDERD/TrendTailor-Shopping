const youtubeAPI = 'https://www.googleapis.com/youtube/v3';

/**
 * ISO 8601 duration 문자열(예: PT1H2M30S, PT8M15S)을 초(second) 단위로 변환
 */
export function parseISO8601Duration(duration: string): number {
  const match = duration.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
  if (!match) return 0;

  const hours = parseInt(match[1] || '0', 10);
  const minutes = parseInt(match[2] || '0', 10);
  const seconds = parseInt(match[3] || '0', 10);

  return hours * 3600 + minutes * 60 + seconds;
}

// 2026.09.20. 특정 채널 동영상 검색 (/search) -> (/channels + /playlistItems)
// 재생목록을 통한 Quata 1회 최적 조회 방식으로 개선
/**
 * 1단계: 채널 검색 엔드포인트 (/channels)
 * channelID로 업로드 재생목록(Uploads Playlist) ID 조회 (Quota 1)
 */
async function getUploadsPlaylistId(
  channelId: string,
  apiKey: string
): Promise<string> {
  const response = await fetch(
    `${youtubeAPI}/channels?part=contentDetails&id=${channelId}&key=${apiKey}`,
    { next: { revalidate: 3600 } } // 1시간 캐싱
  );

  if (!response.ok) {
    throw new Error(`Failed to fetch channel details: ${response.statusText}`);
  }

  const data = await response.json();
  const uploadsId = data.items?.[0]?.contentDetails?.relatedPlaylists?.uploads;

  if (!uploadsId) {
    throw new Error('Uploads playlist not found for this channel.');
  }

  return uploadsId;
}

/**
 * 2단계 & 3단계: PlaylistItems -> Videos 엔드포인트 체이닝 조회 및 Duration 필터링
 */
export async function getFilteredChannelVideos(
  channelId: string, // 채널 ID
  apiKey: string, // API 키
  minMinutes = 4, // 영상 최소 시간 (숏츠 제외하기 위한 기본 4분 설정)
  maxMinutes = 20, // 영상 최대 시간 (기본 20분 설정)
  maxResults = 50 // 영상 최대 결과 수
): Promise<videoType[]> {
  // 채널 업로드 재생목록 ID 조회
  const uploadsPlaylistId = await getUploadsPlaylistId(channelId, apiKey);

  // 1. playlistItems 호출하여 videoId 및 snippet 수집
  const playlistRes = await fetch(
    `${youtubeAPI}/playlistItems?part=snippet,contentDetails&playlistId=${uploadsPlaylistId}&maxResults=${maxResults}&key=${apiKey}`,
    { next: { revalidate: 1800 } }
  );

  if (!playlistRes.ok)
    throw new Error(
      `Failed to fetch playlist items: ${playlistRes.statusText}`
    );
  const playlistData = await playlistRes.json();

  const rawItems = playlistData.items || [];
  if (rawItems.length === 0) return [];

  // videoId 목록 추출 (예: "id1,id2,id3...")
  const videoIds = rawItems
    .map((item: any) => item.contentDetails?.videoId)
    .filter(Boolean)
    .join(',');

  // 2. videos 엔드포인트 호출하여 contentDetails.duration 구하기
  const videosRes = await fetch(
    `${youtubeAPI}/videos?part=snippet,contentDetails&id=${videoIds}&key=${apiKey}`,
    { next: { revalidate: 1800 } }
  );

  if (!videosRes.ok)
    throw new Error(`Failed to fetch video details: ${videosRes.statusText}`);
  const videosData = await videosRes.json();

  const minSeconds = minMinutes * 60;
  const maxSeconds = maxMinutes * 60;

  // 3. Duration 파싱 및 4분~20분 필터링
  const filteredVideos: videoType[] = (videosData.items || [])
    .map((item: any) => {
      const durationStr = item.contentDetails?.duration || '';
      const durationSeconds = parseISO8601Duration(durationStr);

      // 비디오 필드 스키마 반환 (videoType 타입)
      return {
        id: item.id,
        title: item.snippet?.title || '',
        description: item.snippet?.description || '',
        thumbnails: {
          high: item.snippet?.thumbnails?.high?.url || '',
          default: item.snippet?.thumbnails?.default?.url || '',
        },
        publishedAt: item.snippet?.publishedAt || '',
        durationSeconds,
        channelTitle: item.snippet?.channelTitle || '',
      };
    })
    .filter((video: videoType) => {
      return (
        video.durationSeconds >= minSeconds &&
        video.durationSeconds <= maxSeconds
      );
    });

  return filteredVideos;
}
