import { NextRequest, NextResponse } from 'next/server';
import { v2 as cloudinary } from 'cloudinary';
import puppeteer from 'puppeteer-core';
import chromium from 'chrome-aws-lambda';
// Configure Cloudinary

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
  api_secret: process.env.NEXT_PUBLIC_CLOUDINARY_API_SECRET,
});
export async function POST(req: NextRequest) {
  const { htmlContent } = await req.json();  // Parse the incoming JSON body

  try {
    const browser = await puppeteer.launch({
        args: [...chromium.args, '--no-sandbox', '--disable-setuid-sandbox'],
        executablePath: await chromium.executablePath,
        headless: chromium.headless,
      });
      const page = await browser.newPage();
    await page.setContent(htmlContent);
    const pdfBuffer = await page.pdf({
      format: 'a4',
      printBackground: true,
    });

    await browser.close();
 
    

    // Create a promise that resolves when the PDF is uploaded to Cloudinary
    const uploadPromise = new Promise<NextResponse>((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        { resource_type: 'raw'  },
        (error, result) => {
          if (error) {
            console.error('Error uploading PDF to Cloudinary:', error);
            reject(NextResponse.json({ error: 'PDF Upload Failed' }, { status: 500 }));
          }
          if (result) {
            resolve(NextResponse.json({ downloadUrl: result.secure_url }));
          } else {
            reject( NextResponse.json({ error: 'PDF Upload Failed' }, { status: 500 }));
          }
        }
      );

      // Pipe the PDF buffer into Cloudinary upload stream
      uploadStream.end(pdfBuffer);
    });

    // Wait for the upload to complete and return the response
    return uploadPromise;
    
  } catch (error) {
    console.error('Error generating PDF:', error);
    return NextResponse.json({ error: 'Error generating PDF' }, { status: 500 });
  }
}
