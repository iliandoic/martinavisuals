import { S3Client, ListObjectsV2Command } from '@aws-sdk/client-s3'
import { NextResponse } from 'next/server'

const BUCKET_NAME = 'martinavisuals'
const R2_PUBLIC_URL = 'https://pub-1600d09c709b4e389d3bb0a876a3906d.r2.dev'

const s3 = new S3Client({
  region: 'auto',
  endpoint: `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID!,
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY!,
  },
})

export async function GET(
  request: Request,
  { params }: { params: { category: string } }
) {
  const category = decodeURIComponent(params.category)

  try {
    const images: { src: string; filename: string }[] = []
    let continuationToken: string | undefined

    do {
      const command = new ListObjectsV2Command({
        Bucket: BUCKET_NAME,
        Prefix: `${category}/`,
        ContinuationToken: continuationToken,
      })

      const response = await s3.send(command)

      if (response.Contents) {
        for (const obj of response.Contents) {
          const key = obj.Key
          if (!key || key === `${category}/` || !key.match(/\.(jpg|jpeg|png|webp|gif)$/i)) {
            continue
          }

          const filename = key.replace(`${category}/`, '')
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
