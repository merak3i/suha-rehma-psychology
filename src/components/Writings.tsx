import { ExternalLink } from 'lucide-react'
import { CircularGallery } from './ui/circular-gallery'
import type { GalleryItem } from './ui/circular-gallery'
import substackData from '../data/substack-posts.json'

const SUBSTACK_URL = 'https://neurodiversetherapist.substack.com'

// Calm, warm Unsplash fallbacks that match the site palette when a post
// has no unique cover image (or uses the author profile photo as cover).
const FALLBACK_IMAGES = [
  'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=800&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?w=800&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1501854140801-50d01698950b?w=800&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1518020382113-a7e8fc38eac9?w=800&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1519331379826-f10be5486c6f?w=800&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1495616811223-4d98c6e9c869?w=800&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1510784722466-f2aa240a0bd3?w=800&auto=format&fit=crop&q=80',
]

// The profile avatar hash — posts without unique cover art share this image.
const PROFILE_AVATAR_HASH = 'a8265695-ba8d-4708-ba00-ff901f436f4a'

function formatDate(dateStr: string): string {
  const d = new Date(dateStr)
  if (isNaN(d.getTime())) return dateStr
  return d.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
}

function resolveCover(coverImage: string, fallbackIndex: number): string {
  // If the cover is the profile avatar, use a curated fallback instead
  if (!coverImage || coverImage.includes(PROFILE_AVATAR_HASH)) {
    return FALLBACK_IMAGES[fallbackIndex % FALLBACK_IMAGES.length]
  }
  return coverImage
}

// The circular gallery looks best with ≥ 8 items (45° spacing).
// If fewer posts exist, repeat them to fill the ring.
const MIN_ITEMS = 8

export default function Writings() {
  const { posts } = substackData

  const galleryItems: GalleryItem[] = Array.from(
    { length: Math.max(posts.length, MIN_ITEMS) },
    (_, i) => {
      const post = posts[i % posts.length]
      return {
        common: post.title,
        binomial: formatDate(post.date),
        link: post.url,
        photo: {
          url: resolveCover(post.coverImage, i),
          text: post.description,
          pos: 'center top',
          by: 'Suha Rehma',
        },
      }
    }
  )

  return (
    <section id="writings" className="py-28 md:py-36 px-6 bg-peach/20">
      <div className="max-w-6xl mx-auto">

        {/* Section header */}
        <div className="text-center mb-12 md:mb-16">
          <p className="text-sm font-medium text-cool-grey tracking-widest uppercase mb-4">
            Writings
          </p>
          <h2 className="font-serif text-3xl md:text-5xl text-slate-blue font-medium mb-4">
            From the Substack
          </h2>
          <p className="text-slate-blue/60 max-w-lg mx-auto">
            Therapy, neurodiversity, and the things we're taught to keep separate.
            Scroll or hover to explore — click any card to read.
          </p>
        </div>

        {/* 3D circular carousel */}
        <div className="relative h-[450px] md:h-[580px] w-full">
          <CircularGallery
            items={galleryItems}
            radius={380}
            autoRotateSpeed={0.108}
          />
        </div>

        {/* CTA */}
        <div className="text-center mt-10 md:mt-14">
          <a
            href={SUBSTACK_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm font-medium text-slate-blue/70 hover:text-slate-blue border border-slate-blue/20 hover:border-slate-blue/40 rounded-lg px-5 py-2.5 transition-all duration-300 hover:bg-cream/60"
          >
            Read all writings on Substack
            <ExternalLink size={14} />
          </a>
        </div>

      </div>
    </section>
  )
}
