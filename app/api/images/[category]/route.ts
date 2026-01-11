import { S3Client, ListObjectsV2Command } from '@aws-sdk/client-s3'
import { NextResponse } from 'next/server'

const BUCKET_NAME = 'martinavisuals'
const R2_PUBLIC_URL = 'https://pub-1600d09c709b4e389d3bb0a876a3906d.r2.dev'

// Strip prefix like "01-" or "1. " from folder name
function getDisplayName(folderName: string): string {
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

// Find the actual R2 folder path from a clean slug
async function findFolderPath(cleanSlug: string): Promise<string | null> {
  const parts = cleanSlug.split('/')

  // List top-level folders
  const command = new ListObjectsV2Command({
    Bucket: BUCKET_NAME,
    Delimiter: '/',
  })
  const response = await s3.send(command)

  if (!response.CommonPrefixes) return null

  // Find matching top-level folder
  let matchedFolder: string | null = null
  for (const prefix of response.CommonPrefixes) {
    const folder = prefix.Prefix?.replace('/', '') || ''
    if (getDisplayName(folder).toLowerCase() === parts[0].toLowerCase()) {
      matchedFolder = folder
      break
    }
  }

  if (!matchedFolder) return null

  // If there's a subcategory, find it
  if (parts.length > 1) {
    const subCommand = new ListObjectsV2Command({
      Bucket: BUCKET_NAME,
      Prefix: `${matchedFolder}/`,
      Delimiter: '/',
    })
    const subResponse = await s3.send(subCommand)

    if (!subResponse.CommonPrefixes) return null

    for (const subPrefix of subResponse.CommonPrefixes) {
      const subFolder = subPrefix.Prefix?.replace(`${matchedFolder}/`, '').replace('/', '') || ''
      if (getDisplayName(subFolder).toLowerCase() === parts[1].toLowerCase()) {
        return `${matchedFolder}/${subFolder}`
      }
    }
    return null
  }

  return matchedFolder
}

export async function GET(
  request: Request,
  { params }: { params: { category: string } }
) {
  const cleanSlug = decodeURIComponent(params.category)

  try {
    // Find the actual R2 folder path
    const folderPath = await findFolderPath(cleanSlug)

    if (!folderPath) {
      return NextResponse.json({ images: [] }, {
        headers: {
          'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=30',
        },
      })
    }

    const images: { src: string; filename: string }[] = []
    let continuationToken: string | undefined

    do {
      const command = new ListObjectsV2Command({
        Bucket: BUCKET_NAME,
        Prefix: `${folderPath}/`,
        ContinuationToken: continuationToken,
      })

      const response = await s3.send(command)

      if (response.Contents) {
        for (const obj of response.Contents) {
          const key = obj.Key
          if (!key || key === `${folderPath}/` || !key.match(/\.(jpg|jpeg|png|webp|gif)$/i)) {
            continue
          }

          const filename = key.replace(`${folderPath}/`, '')
          // Skip if filename is in a subfolder
          if (filename.includes('/')) continue

          images.push({
            src: `${R2_PUBLIC_URL}/${key}`,
            filename,
          })
        }
      }

      continuationToken = response.NextContinuationToken
    } while (continuationToken)

    return NextResponse.json({ images }, {
      headers: {
        'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=30',
      },
    })
  } catch (error) {
    console.error('Error fetching images:', error)
    return NextResponse.json({ error: 'Failed to fetch images' }, { status: 500 })
  }
}
