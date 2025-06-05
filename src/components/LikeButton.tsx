import React from 'react';
import { useQuery, useMutation } from 'convex/react';
import { api } from '../convex/_generated/api';
import { Star } from 'lucide-react';

function getDeviceId(): string {
  const key = 'portfolio-device-id';
  let id = localStorage.getItem(key);
  if (!id) {
    id = crypto.randomUUID();
    localStorage.setItem(key, id);
  }
  return id;
}

export function LikeButton({ imageId }: { imageId: string }) {
  const deviceId = getDeviceId();

  const likeCount = useQuery(api.likeImage.getLikes, { imageId });
  const hasLiked = useQuery(api.likeImage.hasLiked, { imageId, deviceId });
  const like = useMutation(api.likeImage.like);

  const handleLike = async () => {
    if (!hasLiked) {
      await like({ imageId, deviceId });
    }
  };

  return (
    <button
      onClick={handleLike}
      className="flex flex-col items-center group transition-transform duration-300"
    >
      <Star
        size={36}
        className={`transition-transform duration-500 group-hover:scale-125 group-hover:rotate-12 ${
          hasLiked ? 'text-yellow-400 fill-yellow-400' : 'text-gray-400'
        }`}
      />
      <span className="mt-2 text-sm font-bold text-forest drop-shadow-[0_2px_2px_rgba(0,0,0,0.2)] group-hover:scale-110 transition-all duration-300">
        {likeCount ?? 0} {likeCount === 1 ? 'Like' : 'Likes'}
      </span>
    </button>
  );
}
