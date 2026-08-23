import type { CaseBlock } from '../../types/case'
import { cx } from '../../utils/cx'

/** Renders one content block from a case study. */
function Block({ block }: { block: CaseBlock }) {
  switch (block.kind) {
    case 'paragraph':
      return <p>{block.text}</p>

    case 'list':
      return (
        <ul className="space-y-3">
          {block.items.map((item) => (
            <li key={item.lead ?? item.text} className="case-bullet">
              {item.lead ? (
                <>
                  <strong className="font-semibold text-ink">{item.lead}:</strong>{' '}
                </>
              ) : null}
              {item.text}
            </li>
          ))}
        </ul>
      )

    case 'quote':
      return (
        <blockquote className="case-quote font-display text-[clamp(19px,2.2vw,23px)] leading-[1.5] text-ink">
          {block.text}
        </blockquote>
      )

    case 'note':
      return (
        <aside className="border-l-2 border-ember/40 pl-5">
          <p className="text-[12px] font-medium tracking-[0.14em] text-ember uppercase">
            {block.title}
          </p>
          <ul className="mt-3 space-y-2 text-[15px]">
            {block.items.map((item) => (
              <li key={item} className="case-bullet">
                {item}
              </li>
            ))}
          </ul>
        </aside>
      )
  }
}

interface CaseBlocksProps {
  blocks: CaseBlock[]
  className?: string
}

/** Vertical stack of case-study content blocks with shared prose rhythm. */
export function CaseBlocks({ blocks, className }: CaseBlocksProps) {
  if (blocks.length === 0) return null

  return (
    <div className={cx('case-prose', className)}>
      {blocks.map((block, index) => (
        <Block key={`${block.kind}-${index}`} block={block} />
      ))}
    </div>
  )
}
