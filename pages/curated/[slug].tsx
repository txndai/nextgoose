import { PageSEO } from '@/components/SEO'
import dynamic from 'next/dynamic'
import Head from 'next/head'
import CustomLink from '../../components/CustomLink'
import Layout from '../../components/Layout'
import { allPosts, type Post } from 'contentlayer/generated'
import { useMDXComponent } from 'next-contentlayer/hooks'
import Image from 'next/image'

// Custom components/renderers to pass to MDX.
// Since the MDX files aren't loaded by webpack, they have no knowledge of how
// to handle import statements. Instead, you must include components in scope
// here.
const components = {
  a: CustomLink,
  // It also works with dynamically-imported components, which is especially
  // useful for conditionally loading components for certain routes.
  // See the notes in README.md for more details.
  Album: dynamic(() => import('../../components/Album')),
  Track: dynamic(() => import('../../components/Track')),
  Playlist: dynamic(() => import('../../components/Playlist')),
  Head,
}
export const getStaticPaths = async () => {
  const paths: string[] = allPosts.map((post) => post.url)
  return {
    paths,
    fallback: false,
  }
}

export const getStaticProps = async ({ params }) => {
  const post: Post = allPosts.find((post) => post._raw.flattenedPath === `curated/${params.slug}`)

  return {
    props: {
      post,
    },
  }
}

export default function PostPage({ post }: { post: Post }) {
  const MDXContent = useMDXComponent(post.body.code)

  return (
    <>
      <Layout>
        <PageSEO
          title={post.title}
          description={post.description || 'Goosebumps.fm curated sounds'}
          ogImageUrl={post.thumbnailUrl || null}
          canonicalUrl={post.canonicalUrl || null}
        />

        <div className="grid grid-cols-4 mt-10 mb-12 space-x-5 md:mb-16 lg:mb-24">
          <Image
            className="object-cover w-3/4 col-span-4 mx-auto rounded-md md:col-span-1 aspect-square"
            src={
              post.thumbnailUrl ||
              'https://res.cloudinary.com/hokaspokas/image/upload/v1663215741/goosebumpsfm/generic_Thumb.svg'
            }
            alt={`Thumbnail image for post titled - ${post.title}`}
            width={320}
            height={320}
            loading="lazy"
            quality={100}
          />
          <div className="col-span-3 text-center ">
            <h3 className="mt-0 text-left">{post.title}</h3>
            {post.description && <p className="font-bold text-left ">{post.description}</p>}
          </div>
        </div>
        <article className="px-3 list-disc">
          <MDXContent components={components} />
        </article>
      </Layout>
    </>
  )
}
