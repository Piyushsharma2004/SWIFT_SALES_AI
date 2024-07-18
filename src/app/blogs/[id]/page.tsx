// pages/blogs/[id]/page.tsx

import { getBlogPosts, getBlogPostById, Post } from '@/utils/getBlogPosts'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import parse from 'html-react-parser'
import { auth } from '@clerk/nextjs'
import {RxCaretLeft, RxCaretRight} from "react-icons/rx"

type Props = {
  params: {
    id: string;

  }
}

export async function generateStaticParams() {
  const posts = await getBlogPosts()
  return posts.map(post => ({ id: post.id }))
}

const BlogPostPage = async ({ params }: Props) => {
  const post: Post | undefined = await getBlogPostById(params.id)

  if (!post) {
    notFound()
  }
  

  return (

    <div className="container my-10 md:w-5/12">
        <a href="javascript:history.back()"
                        className=' w-9
                            rounded-full
                            bg-black
                            flex
                            items-center
                            justify-center
                            hover:opacity-75
                            transition'>
                     <RxCaretLeft size={35}
                                  className="text-white" /> 
                     
                </a>
         <p className="text-gray-500 mt-2 ">
        {new Date(post.createdAt).toLocaleDateString()}
      </p>
      <h1 className="text-4xl font-bold mb-5">{post.title}</h1>
      
      <div className="prose">
      {parse(post.content)}
      </div>
    <div className=" mb-5 mt-3 ">
        <Image
          src={post.image}
          alt={post.title}
          layout="responsive" // Change to 'responsive'
          width={100} // Aspect ratio, not actual width
          height={40} // Aspect ratio, not actual height
          className='rounded-md h-[400px] w-full object-cover'
        />
      </div>
     
      <div className="prose">
      {parse(post.content)}
      </div>
      <div className="prose">
      {parse(post.content)}
      {parse(post.content)}
      {parse(post.content)}
      </div>
      
     
    </div>
  )
}

export default BlogPostPage
