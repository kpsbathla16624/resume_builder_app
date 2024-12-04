// app/api/generateResume/route.js

import puppeteer from 'puppeteer';

import { NextRequest } from 'next/server';

export async function POST(req: NextRequest) {
  const { htmlContent } = await req.json();

  // Launch Puppeteer and create a new page
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  // Set the content of the page with the HTML passed from the client
  await page.setContent(htmlContent);

  // Generate PDF from the HTML content
  const pdfBuffer = await page.pdf({
    format: 'A4',
    printBackground: true,
  });

  await browser.close();

  // Return the PDF as a response
  return new Response(pdfBuffer, {
    status: 200,
    headers: {
      'Content-Type': 'application/pdf',
      'Content-Disposition': 'attachment; filename=resume.pdf',
    },
  });
}
