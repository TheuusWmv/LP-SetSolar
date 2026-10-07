import type { ImgHTMLAttributes } from "react";
import manifest from "../data/imageManifest.json";
type ImageEntry = {
  src: string;
  srcSet?: string;
  width: number;
  height: number;
};
export function OptimizedImage({
  src = "",
  sizes,
  loading = "lazy",
  decoding = "async",
  ...props
}: ImgHTMLAttributes<HTMLImageElement>) {
  const image = (manifest as Record<string, ImageEntry>)[src];
  return (
    <img
      {...props}
      src={image?.src ?? src}
      srcSet={image?.srcSet}
      width={image?.width ?? props.width}
      height={image?.height ?? props.height}
      sizes={
        sizes ??
        (src.includes("/logo") ? "160px" : "(min-width: 1024px) 640px, 100vw")
      }
      loading={loading}
      decoding={decoding}
    />
  );
}
