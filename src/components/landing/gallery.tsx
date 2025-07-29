import Image from 'next/image';

const galleryImages = [
  { src: "https://placehold.co/600x800.png", alt: "Bride and groom smiling", hint: "wedding couple" },
  { src: "https://placehold.co/600x400.png", alt: "Wedding reception decor", hint: "wedding decoration" },
  { src: "https://placehold.co/600x400.png", alt: "Wedding cake", hint: "wedding cake" },
  { src: "https://placehold.co/600x800.png", alt: "Outdoor wedding ceremony", hint: "outdoor wedding" },
  { src: "https://placehold.co/600x400.png", alt: "Detailed shot of wedding rings", hint: "wedding rings" },
  { src: "https://placehold.co/600x800.png", alt: "Couple's first dance", hint: "wedding dance" },
];

export function Gallery() {
  return (
    <section id="gallery" className="w-full py-12 md:py-24 lg:py-32 bg-secondary">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm text-primary font-medium">Gallery</div>
          <h2 className="font-headline text-3xl font-bold tracking-tighter sm:text-5xl">
            Moments We've Created
          </h2>
          <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
            Browse through our portfolio of beautiful weddings and get inspired for your special day.
          </p>
        </div>
        <div className="mt-12 columns-2 gap-4 sm:columns-3">
          {galleryImages.map((image, index) => (
            <div key={index} className="break-inside-avoid">
              <Image
                src={image.src}
                alt={image.alt}
                width={600}
                height={index % 3 === 0 ? 800 : 400}
                className="mb-4 h-auto w-full rounded-lg object-cover shadow-lg transition-transform duration-300 hover:scale-105"
                data-ai-hint={image.hint}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
