import { Link } from 'react-router-dom'
import { blogPosts, blogSection } from '../../data/site'
import type { BlogPost } from '../../types/site'
import { cx } from '../../utils/cx'
import { CardArrow } from '../icons/SketchIcons'
import { Grain } from '../ui/Grain'
import { PaperCard } from '../ui/PaperCard'
import { SectionHeading } from '../ui/SectionHeading'

function StatusBadge({ status }: Pick<BlogPost, 'status'>) {
  const published = status === 'Published'

  return (
    <span
      className={cx(
        'px-3 py-1.5 text-[11px] font-medium',
        published
          ? 'border border-ink text-ink'
          : 'border border-dashed border-ink/32 text-ink-faint',
      )}
    >
      {status}
    </span>
  )
}

function BlogCard({ post, index }: { post: BlogPost; index: number }) {
  return (
    <Link
      to={post.href}
      data-reveal
      className="rowlink relative block h-full"
      style={{ transitionDelay: `${index * 80}ms` }}
    >
      <PaperCard
        tilt={post.tilt}
        tape={post.tape}
        className="px-6 py-7"
        contentClassName="justify-between gap-7"
      >
        <div>
          <p className="text-[12px] font-medium tracking-[0.16em] text-ember uppercase">
            {post.tag}
          </p>
          <h3 className="mt-2 font-display text-[20px] leading-snug font-bold">
            {post.title}
          </h3>
          <p className="mt-2 text-[15px] leading-[1.6] text-ink-muted">
            {post.excerpt}
          </p>
        </div>

        <div className="flex shrink-0 items-center justify-between gap-5 text-ember">
          <StatusBadge status={post.status} />
          <CardArrow />
        </div>
      </PaperCard>
    </Link>
  )
}

export function Blogs() {
  return (
    <section
      id="notes"
      className="relative w-full overflow-hidden py-24 scroll-mt-(--header-height)"
    >
      <Grain />
      <div className="relative z-[4] mx-auto max-w-[1280px] px-6 md:px-8">
        <SectionHeading>{blogSection.title}</SectionHeading>

        <div className="mt-14 grid grid-cols-1 items-stretch gap-7 sm:grid-cols-2 lg:grid-cols-4">
          {blogPosts.map((post, index) => (
            <BlogCard key={post.id} post={post} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}
