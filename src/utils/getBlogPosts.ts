// utils/getBlogPosts.ts
import path from 'path'
import fs from 'fs/promises'

export type Post = {
  id: string
  title: string
  image: string
  content: string
  createdAt: Date

}

export const getBlogPosts = async (): Promise<Post[]> => {
  const filePath = path.join(process.cwd(), 'public', 'posts.json')
  const jsonData = await fs.readFile(filePath, 'utf-8')
  const posts = JSON.parse(jsonData)
  return posts.map((post: any) => ({
    ...post,
    createdAt: new Date(post.createdAt)
  }))
}

export const getBlogPostById = async (id: string): Promise<Post | undefined> => {
  const posts = await getBlogPosts()
  return posts.find(post => post.id === id)
}

export const onGetBlogPosts = async (): Promise<Post[]> => {
  try {
    const filePath = path.join(process.cwd(), 'public', 'posts.json')
    const jsonData = await fs.readFile(filePath, 'utf-8')
    const posts = JSON.parse(jsonData)
    return posts.map((post: any) => ({
      ...post,
      createdAt: new Date(post.createdAt)
    }))
  } catch (error) {
    console.log(error)
    return []
  }
}

export const onGetBlogPost = async (id: string): Promise<Post | undefined> => {
  try {
    const filePath = path.join(process.cwd(), 'public', 'posts.json')
    const jsonData = await fs.readFile(filePath, 'utf-8')
    const posts = JSON.parse(jsonData)
    const post = posts.find((post: any) => post.id === id)
    return post ? { ...post, createdAt: new Date(post.createdAt) } : undefined
  } catch (error) {
    console.log(error)
    return undefined
  }
}
