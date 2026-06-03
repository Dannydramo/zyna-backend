const fs = require('fs');
const path = require('path');

const sourceDir = path.join(__dirname, '..', '..', 'zyna-dashboard', 'public');
const targetDir = path.join(__dirname, '..', 'public');
const sourceFile = path.join(sourceDir, 'chat-widget.js');
const targetFile = path.join(targetDir, 'chat-widget.js');

try {
  // Create target directory if it doesn't exist
  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
  }

  // Copy the file
  fs.copyFileSync(sourceFile, targetFile);
  console.log(`✅ Chat widget copied from frontend to backend`);
  console.log(`   Source: ${sourceFile}`);
  console.log(`   Target: ${targetFile}`);
} catch (error) {
  console.error('❌ Failed to copy chat widget:', error.message);
  process.exit(1);
}
