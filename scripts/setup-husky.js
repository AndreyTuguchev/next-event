const fs = require('fs');
const path = require('path');

const gitRoot = path.resolve(__dirname, '../');
const huskyDir = path.join(gitRoot, '.husky');
const hookPath = path.join(huskyDir, 'pre-commit');

// Ensure that .husky directory exists
if (!fs.existsSync(huskyDir)) {
  fs.mkdirSync(huskyDir);
}

// Write pre-commit hook file
const hookContent = `#!/bin/sh
. "$(dirname "$0")/_/husky.sh"

npm run precommit`;

fs.writeFileSync(hookPath, hookContent, { encoding: 'utf8' });

console.log('✅ Husky pre-commit hook created successfully.');
