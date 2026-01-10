/**
 * Generate manifest.json from R2 bucket
 *
 * Usage:
 * 1. Create .env file with R2 credentials (see .env.example)
 * 2. Run: node scripts/generate-manifest.js
 * 3. The script will upload manifest.json to your R2 bucket
 */

require('dotenv').config()
const { S3Client, ListObjectsV2Command, PutObjectCommand, GetObjectCommand } = require('@aws-sdk/client-s3')
const https = require('https')
const http = require('http')

const BUCKET_NAME = 'martinavisuals'
const CATEGORIES = ['portraits', 'editorial', 'events', 'graduation', 'bts']
const R2_PUBLIC_URL = 'https://pub-1600d09c709b4e389d3bb0a876a3906d.r2.dev'

// Initialize S3 client for R2
const s3 = new S3Client({
  region: 'auto',
  endpoint: `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID,
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY,
  },
})

// Get image dimensions by fetching just the header bytes
async function getImageDimensions(url) {
  return new Promise((resolve) => {
    const protocol = url.startsWith('https') ? https : http

    const req = protocol.get(url, { headers: { Range: 'bytes=0-65535' } }, (res) => {
      const chunks = []
      res.on('data', (chunk) => chunks.push(chunk))
      res.on('end', () => {
        try {
          const buffer = Buffer.concat(chunks)
          const sizeOf = require('image-size')
          const dimensions = sizeOf(buffer)
          resolve({ width: dimensions.width || 1200, height: dimensions.height || 800 })
        } catch {
          // Default dimensions if we can't determine
          resolve({ width: 1200, height: 800 })
        }
      })
    })

    req.on('error', () => {
      resolve({ width: 1200, height: 800 })
    })

    req.setTimeout(10000, () => {
      req.destroy()
      resolve({ width: 1200, height: 800 })
    })
  })
}

async function listImagesInCategory(category) {
  const images = []
  let continuationToken

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
        // Skip if it's just the folder or not an image
        if (key === `${category}/` || !key.match(/\.(jpg|jpeg|png|webp|gif)$/i)) {
          continue
        }

        const filename = key.replace(`${category}/`, '')
        const imageUrl = `${R2_PUBLIC_URL}/${key}`

        console.log(`  Processing: ${filename}`)
        const dimensions = await getImageDimensions(imageUrl)

        images.push({
          filename,
          width: dimensions.width,
          height: dimensions.height,
        })
      }
    }

    continuationToken = response.NextContinuationToken
  } while (continuationToken)

  return images
}

async function generateManifest() {
  console.log('🔍 Scanning R2 bucket for images...\n')

  const manifest = {
    updated: new Date().toISOString(),
    images: {},
  }

  for (const category of CATEGORIES) {
    console.log(`📁 Category: ${category}`)
    const images = await listImagesInCategory(category)
    manifest.images[category] = images
    console.log(`   Found ${images.length} images\n`)
  }

  // Upload manifest to R2
  console.log('📤 Uploading manifest.json to R2...')

  const putCommand = new PutObjectCommand({
    Bucket: BUCKET_NAME,
    Key: 'manifest.json',
    Body: JSON.stringify(manifest, null, 2),
    ContentType: 'application/json',
  })

  await s3.send(putCommand)

  console.log('✅ Done! manifest.json uploaded to R2')
  console.log(`\n📋 Summary:`)
  for (const [cat, imgs] of Object.entries(manifest.images)) {
    console.log(`   ${cat}: ${imgs.length} images`)
  }
}

// Check for required env vars
if (!process.env.R2_ACCOUNT_ID || !process.env.R2_ACCESS_KEY_ID || !process.env.R2_SECRET_ACCESS_KEY) {
  console.error('❌ Missing environment variables!')
  console.error('Please create a .env file with:')
  console.error('  R2_ACCOUNT_ID=your_account_id')
  console.error('  R2_ACCESS_KEY_ID=your_access_key')
  console.error('  R2_SECRET_ACCESS_KEY=your_secret_key')
  console.error('\nGet these from: Cloudflare Dashboard → R2 → Manage R2 API Tokens')
  process.exit(1)
}

generateManifest().catch(console.error)
