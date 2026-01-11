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

    const categories: { slug: string; label: string; subcategories?: { slug: string; label: string }[] }[] = []

    if (response.CommonPrefixes) {
      for (const prefix of response.CommonPrefixes) {
        const folder = prefix.Prefix?.replace('/', '') || ''
        if (!folder) continue

        // Check for subcategories
        const subCommand = new ListObjectsV2Command({
          Bucket: BUCKET_NAME,
          Prefix: `${folder}/`,
          Delimiter: '/',
        })
        const subResponse = await s3.send(subCommand)

        const subcategories: { slug: string; label: string }[] = []

        if (subResponse.CommonPrefixes) {
          for (const subPrefix of subResponse.CommonPrefixes) {
            const subFolder = subPrefix.Prefix?.replace(`${folder}/`, '').replace('/', '') || ''
            if (subFolder) {
              subcategories.push({
                slug: subFolder,
                label: getDisplayName(subFolder),
              })
            }
          }
        }

        categories.push({
          slug: folder,
          label: getDisplayName(folder),
          ...(subcategories.length > 0 && { subcategories }),
        })
      }
    }

    return NextResponse.json({ categories }, {
      headers: {
        'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=60',
      },
    })
  } catch (error) {
    console.error('Error fetching categories:', error)
    return NextResponse.json({ error: 'Failed to fetch categories' }, { status: 500 })
  }
}
