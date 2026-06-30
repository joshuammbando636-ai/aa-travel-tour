import { Share2 } from "lucide-react";

interface Props {
  title: string;
  url?: string;
}

export default function ShareButtons({ title, url }: Props) {
  const shareUrl = url || window.location.href;
  const encodedUrl = encodeURIComponent(shareUrl);
  const encodedTitle = encodeURIComponent(title);

  return (
    <div className="flex items-center gap-2">
      <Share2 className="h-4 w-4 text-muted-foreground" />
      <a
        href={`https://wa.me/?text=${encodedTitle}%20${encodedUrl}`}
        target="_blank"
        rel="noopener noreferrer"
        className="rounded-full bg-muted p-1.5 text-xs transition-colors hover:bg-primary hover:text-primary-foreground"
        aria-label="Share on WhatsApp"
      >
        WhatsApp
      </a>
      <a
        href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`}
        target="_blank"
        rel="noopener noreferrer"
        className="rounded-full bg-muted p-1.5 text-xs transition-colors hover:bg-primary hover:text-primary-foreground"
        aria-label="Share on Facebook"
      >
        Facebook
      </a>
      <a
        href={`https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`}
        target="_blank"
        rel="noopener noreferrer"
        className="rounded-full bg-muted p-1.5 text-xs transition-colors hover:bg-primary hover:text-primary-foreground"
        aria-label="Share on X"
      >
        X
      </a>
    </div>
  );
}
