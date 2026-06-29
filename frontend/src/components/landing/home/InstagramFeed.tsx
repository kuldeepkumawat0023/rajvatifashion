import Image from 'next/image';

// Placeholder slots — will be filled with real Instagram images
const instaImages = Array.from({ length: 6 }, (_, i) => ({
  id: i + 1,
  href: 'https://instagram.com/rajvatifashion',
}));

export default function InstagramFeed() {
  return (
    <section className="py-14 bg-background">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6">
        {/* Heading */}
        <div className="text-center mb-8">
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-foreground mb-1">
            Follow Us On Instagram
          </h2>
          <p className="text-primary font-semibold text-sm">
            Tag us @rajvati_fashion for a feature!
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 sm:gap-3">
          {instaImages.map((img) => (
            <a
              key={img.id}
              href={img.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative aspect-square bg-muted rounded-xl overflow-hidden"
              aria-label="View on Instagram"
            >
              {/* Image */}
              <Image
                src="/assets/images/insta-image.jpg"
                alt="Instagram Feed"
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />

              {/* Hover overlay */}
              <div className="absolute inset-0 bg-primary/60 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              </div>
            </a>
          ))}
        </div>

        {/* Follow button */}
        <div className="text-center mt-8">
          <a
            href="https://instagram.com/rajvatifashion"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 gradient-button px-8 py-3 rounded-full text-sm font-semibold hover:shadow-lg transition-all text-on-primary"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
              <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
            </svg>
            Follow @rajvati_fashion
          </a>
        </div>
      </div>
    </section>
  );
}
