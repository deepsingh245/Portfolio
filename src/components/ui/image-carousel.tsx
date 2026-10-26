import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeftIcon, ChevronRightIcon, ImageIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface ImageCarouselProps {
  images?: string[];
  alt: string;
  className?: string;
}

const PLACEHOLDER_COUNT = 3;

export const ImageCarousel = ({ images, alt, className }: ImageCarouselProps) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const [selected, setSelected] = useState(0);

  const slides = images?.length ? images : null;
  const count = slides ? slides.length : PLACEHOLDER_COUNT;

  const onSelect = useCallback(() => {
    if (emblaApi) setSelected(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi, onSelect]);

  const arrowClass =
    "absolute top-1/2 -translate-y-1/2 z-10 h-7 w-7 flex items-center justify-center rounded-full bg-background/80 border border-border text-foreground opacity-0 group-hover/carousel:opacity-100 transition-opacity hover:bg-background";

  return (
    <div
      className={cn(
        "group/carousel relative aspect-video w-full overflow-hidden rounded-xl border border-border bg-muted/30",
        className
      )}
    >
      <div ref={emblaRef} className="h-full overflow-hidden">
        <div className="flex h-full">
          {Array.from({ length: count }).map((_, i) => (
            <div key={i} className="relative h-full min-w-0 flex-[0_0_100%]">
              {slides ? (
                <img
                  loading="lazy"
                  src={slides[i]}
                  alt={`${alt} screenshot ${i + 1}`}
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-primary/15 via-background to-muted/40">
                  <ImageIcon className="h-10 w-10 text-primary/20" aria-hidden="true" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {count > 1 && (
        <>
          <button
            type="button"
            aria-label="Previous image"
            className={cn(arrowClass, "left-2")}
            onClick={() => emblaApi?.scrollPrev()}
          >
            <ChevronLeftIcon className="h-4 w-4" />
          </button>
          <button
            type="button"
            aria-label="Next image"
            className={cn(arrowClass, "right-2")}
            onClick={() => emblaApi?.scrollNext()}
          >
            <ChevronRightIcon className="h-4 w-4" />
          </button>
          <div className="absolute bottom-2 left-1/2 z-10 flex -translate-x-1/2 gap-1.5">
            {Array.from({ length: count }).map((_, i) => (
              <button
                key={i}
                type="button"
                aria-label={`Go to image ${i + 1}`}
                onClick={() => emblaApi?.scrollTo(i)}
                className={cn(
                  "h-1.5 rounded-full transition-all",
                  i === selected ? "w-4 bg-primary" : "w-1.5 bg-foreground/30"
                )}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};
