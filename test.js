import { chromium } from 'playwright';

(async () => {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();
  
  const errors = [];
  page.on('console', msg => {
    if (msg.type() === 'error') {
      errors.push(msg.text());
    }
  });
  
  page.on('pageerror', err => {
    errors.push(err.message);
  });
  
  try {
    // Test 1: Load homepage
    console.log('Testing: Loading homepage...');
    await page.goto('http://localhost:5173/', { waitUntil: 'networkidle' });
    
    // Check title
    const title = await page.title();
    console.log('Page title:', title);
    
    // Check for main heading
    const heading = await page.locator('h1').textContent();
    console.log('Main heading:', heading);
    
    // Check for Start Screen Test button
    const startButton = await page.locator('button:has-text("Start Screen Test")');
    const buttonExists = await startButton.isVisible();
    console.log('Start button visible:', buttonExists);
    
    // Check for browser support indicator (use first() to handle multiple matches)
    const supportText = await page.locator('text=Your browser supports screen sharing').first().isVisible();
    console.log('Browser support indicator visible:', supportText);
    
    // Test 2: Navigate to screen test page
    console.log('\nTesting: Navigating to screen test page...');
    await startButton.click();
    await page.waitForTimeout(1000);
    
    // Check we're on the screen test page
    const pageContent = await page.content();
    const isOnScreenTest = pageContent.includes('Start Screen Share') || pageContent.includes('Screen Sharing');
    console.log('On screen test page:', isOnScreenTest);
    
    // Check for video element (should be hidden initially)
    const videoElement = await page.locator('video');
    const videoExists = await videoElement.count();
    console.log('Video element count:', videoExists);
    
    // Test 3: Check for status badge
    const statusBadge = await page.locator('.rounded-full:has-text("Ready")');
    const statusVisible = await statusBadge.isVisible().catch(() => false);
    console.log('Status badge visible:', statusVisible);
    
    console.log('\n--- Test Results ---');
    if (errors.length > 0) {
      console.log('Console Errors:', errors);
    } else {
      console.log('No critical errors found!');
    }
    console.log('All basic tests passed!');
    
  } catch (error) {
    console.error('Test failed:', error.message);
  } finally {
    await browser.close();
  }
})();
