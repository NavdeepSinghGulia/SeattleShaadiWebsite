import Image from 'next/image';

export function About() {
  return (
    <section id="about" className="w-full py-12 md:py-24 lg:py-32 bg-secondary">
      <div className="container grid items-center gap-6 px-4 md:px-6 lg:grid-cols-2 lg:gap-12">
        <div className="space-y-4">
          <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm text-primary font-medium">About Us</div>
          <h2 className="font-headline text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            A Passion for Perfection
          </h2>
          <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
            Seattle Shaadi is a premier wedding planning company specializing in creating bespoke, luxurious, and culturally rich celebrations. Our team is dedicated to understanding your unique story and translating it into an unforgettable experience. With years of experience and a network of trusted vendors, we handle every detail with precision and care.
          </p>
        </div>
        <div className="flex justify-center">
            <Image
              src="https://placehold.co/550x550.png"
              alt="Wedding planners discussing details"
              width={550}
              height={550}
              className="mx-auto aspect-square overflow-hidden rounded-xl object-cover shadow-lg"
              data-ai-hint="wedding couple"
            />
        </div>
      </div>
    </section>
  );
}
