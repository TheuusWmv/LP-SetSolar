import { InfiniteSlider } from '@/components/ui/infinite-slider';
import { ProgressiveBlur } from '@/components/ui/progressive-blur';

const logos = [
  {
    id: "logo-2",
    description: "Figma",
    image: "https://cdn.21st.dev/assets/mirror/25/25a0515c472578f5dfcfeb765be5383f6893cda1f0f1560f69d3bcabdda71693.svg",
    className: "h-7 w-auto",
  },
  {
    id: "logo-3",
    description: "Next.js",
    image: "https://cdn.21st.dev/assets/mirror/8f/8f4aec13fdd1bf3b6b5566a6c4f5feade1c5e5b492fa81ba32f62f3aa155220e.svg",
    className: "h-7 w-auto",
  },
  {
    id: "logo-6",
    description: "Supabase",
    image: "https://cdn.21st.dev/assets/mirror/54/5414744d341683260469fbaa9a518e0a4b3000ddd714ce5d0525f8e2cebcb064.svg",
    className: "h-7 w-auto",
  },
  {
    id: "logo-8",
    description: "Vercel",
    image: "https://www.shadcnblocks.com/images/block/logos/vercel.svg",
    className: "h-7 w-auto",
  },
];

export function LogosSlider() {
  return (
    <div className='relative h-[100px] w-full overflow-hidden bg-white'>
      <InfiniteSlider 
        className='flex h-full w-full items-center' 
        duration={30}
        gap={48}
      >
        {logos.map((logo) => (
          <div 
            key={logo.id} 
            className='flex w-32 items-center justify-center'
          >
            <img
              src={logo.image}
              alt={logo.description}
              className={logo.className}
            />
          </div>
        ))}
      </InfiniteSlider>
      <ProgressiveBlur
        className='pointer-events-none absolute top-0 left-0 h-full w-[200px]'
        direction='left'
        blurIntensity={1}
      />
      <ProgressiveBlur
        className='pointer-events-none absolute top-0 right-0 h-full w-[200px]'
        direction='right'
        blurIntensity={1}
      />
    </div>
  );
}
