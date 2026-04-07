import { MetadataRoute } from 'next'
import { htmlLessons } from '@/data/htmlLessons'
import { cssLessons } from '@/data/cssLessons'
import { javascriptLessons } from '@/data/javascriptLessons'

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://www.codingbanana.com'

  const htmlPages = htmlLessons.map((lesson) => ({
    url: `${base}/html/${lesson.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }))

  const cssPages = cssLessons.map((lesson) => ({
    url: `${base}/css/${lesson.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }))

  const jsPages = javascriptLessons.map((lesson) => ({
    url: `${base}/javascript/${lesson.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }))

  return [
    {
      url: base,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 1.0,
    },
    {
      url: `${base}/html`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${base}/css`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${base}/javascript`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${base}/compiler/html`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
    {
      url: `${base}/about`,
      lastModified: new Date(),
      changeFrequency: 'yearly' as const,
      priority: 0.5,
    },
    {
      url: `${base}/contact`,
      lastModified: new Date(),
      changeFrequency: 'yearly' as const,
      priority: 0.5,
    },
    {
      url: `${base}/privacy`,
      lastModified: new Date(),
      changeFrequency: 'yearly' as const,
      priority: 0.3,
    },
    {
      url: `${base}/terms`,
      lastModified: new Date(),
      changeFrequency: 'yearly' as const,
      priority: 0.3,
    },
    ...htmlPages,
    ...cssPages,
    ...jsPages,
  ]
}
