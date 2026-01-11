import { S3Client, ListObjectsV2Command } from '@aws-sdk/client-s3'
import { NextResponse } from 'next/server'

const BUCKET_NAME = 'martinavisuals'

// Strip prefix like "01-" or "1. " from folder name for display
function getDisplayName(folderName: string): string {
  // Remove leading numbers, dots, dashes, spaces (e.g., "01-Editorial" -> "Editorial")
  return folderName.replace(/^\d+[-.\s]*/, '')
}

const s3 = new S3Client({
  region: 'auto',
  endpoint: `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID!,
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY!,
  },
})

export async function GET() {
  try {
    const command = new ListObjectsV2Command({
      Bucket: BUCKET_NAME,
      Delimiter: '/',
    })

    const response = await s3.send(command)

    const categories: { slug: string; fullPath: string; label: string; subcategories?: { slug: string; fullPath: string; label: string }[] }[] = []

    if (response.CommonPrefixes) {
      for (const prefix of response.CommonPrefixes) {
        const folder = prefix.Prefix?.replace('/', '') || ''
        if (!folder) continue

        // Check for subcategories and images
        const subCommand = new ListObjectsV2Command({
          Bucket: BUCKET_NAME,
          Prefix: `${folder}/`,
          Delimiter: '/',
        })
        const subResponse = await s3.send(subCommand)

        // Check if folder has images directly
        const hasImages = subResponse.Contents?.some(obj =>
          obj.Key && obj.Key !== `${folder}/` && obj.Key.match(/\.(jpg|jpeg|png|webp|gif)$/i)
        )

        const subcategories: { slug: string; fullPath: string; label: string }[] = []

        if (subResponse.CommonPrefixes) {
          for (const subPrefix of subResponse.CommonPrefixes) {
            const subFolder = subPrefix.Prefix?.replace(`${folder}/`, '').replace('/', '') || ''
            if (!subFolder) continue

            // Check if subcategory has images
            const subImagesCommand = new ListObjectsV2Command({
              Bucket: BUCKET_NAME,
              Prefix: `${folder}/${subFolder}/`,
              MaxKeys: 1,
            })
            const subImagesResponse = await s3.send(subImagesCommand)
            const subHasImages = subImagesResponse.Contents?.some(obj =>
              obj.Key && obj.Key.match(/\.(jpg|jpeg|png|webp|gif)$/i)
            )

            if (subHasImages) {
              subcategories.push({
                slug: getDisplayName(subFolder),
                fullPath: `${folder}/${subFolder}`,
                label: getDisplayName(subFolder),
              })
            }
          }
        }

        // Only add category if it has images or non-empty subcategories
        if (hasImages || subcategories.length > 0) {
          categories.push({
            slug: getDisplayName(folder),
            fullPath: folder,
            label: getDisplayName(folder),
            ...(subcategories.length > 0 && { subcategories }),
          })
        }
      }
    }

    return NextResponse.json({ categories }, {
      headers: {
        'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=30',
      },
    })
  } catch (error) {
    console.error('Error fetching categories:', error)
    return NextResponse.json({ error: 'Failed to fetch categories' }, { status: 500 })
  }
}
