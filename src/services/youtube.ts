export const getYoutubeTranscript = async (url: string) => {
  const response = await fetch('/api/youtube/transcript', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ url })
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.error || 'Failed to fetch YouTube transcript');
  }

  return response.json();
};

export const getAudioTranscript = async (file: File) => {
  const formData = new FormData();
  formData.append('file', file);

  const response = await fetch('/api/audio/transcript', {
    method: 'POST',
    body: formData
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.error || 'Failed to extract transcript from audio/video file');
  }

  return response.json();
};
