import { useMDXComponent } from 'next-contentlayer/hooks'
import dynamic from 'next/dynamic'
import Image from 'next/image'
import React from 'react'
import CustomLink from './CustomLink'
import Head from 'next/head'
import { format, parseISO } from 'date-fns'

interface Props {
  authorName: string
  handle: string
  avatarUrl: string
  date: string
  children?: React.ReactNode
  content: string
}

const components = {
  a: CustomLink,
  // It also works with dynamically-imported components, which is especially
  // useful for conditionally loading components for certain routes.
  // See the notes in README.md for more details.
  Album: dynamic(() => import('./Album')),
  Track: dynamic(() => import('./Track')),
  Playlist: dynamic(() => import('./Playlist')),
  Head,
}

export const Tweet: React.FC<Props> = ({
  authorName,
  children,
  date,
  handle,
  avatarUrl,
  content,
}) => {
  const MDXContent = useMDXComponent(content)

  return (
    <div className="relative w-full mb-8 ">
      <div className="px-6 py-4 ">
        <div className="flex justify-between">
          <div className="flex items-center">
            <a
              className="flex w-12 h-12 mr-3"
              href={`https://twitter.com/${handle}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                alt={authorName}
                src={avatarUrl}
                width={48}
                height={48}
                className="rounded-full"
              />
            </a>
            <a
              href="https://twitter.com/guidefari"
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col ml-4"
            >
              <span className="flex items-center font-bold leading-5 " title={authorName}>
                {authorName}
              </span>
              <span className="" title={`@${handle}`}>
                {' '}
                @{handle}{' '}
              </span>
            </a>
          </div>
          <div className="mb-8 text-center">
            <time dateTime={date} className="mb-1 text-xs ">
              {format(parseISO(date), 'LLLL d, yyyy')}
            </time>
          </div>
        </div>
        <div className="mt-4 mb-2 text-lg leading-normal whitespace-pre-wrap">
          <MDXContent components={components} />

          {children}
        </div>
      </div>
      <hr className="mx-10 my-4 border-b-2 rounded-full border-gb-pastel-green-2" />
    </div>
  )
}
