const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const versionFilePath = path.join(__dirname, 'version.json');
const backupsDir = path.join(__dirname, 'backups');

// 1. Read current version
let versionData = { version: '1.0.0' };
if (fs.existsSync(versionFilePath)) {
  versionData = JSON.parse(fs.readFileSync(versionFilePath, 'utf8'));
}

const currentVersion = versionData.version;
console.log(`📦 Current version: ${currentVersion}`);

// 2. Ensure backups directory exists
if (!fs.existsSync(backupsDir)) {
  fs.mkdirSync(backupsDir, { recursive: true });
}

// 3. Create zip archive
const backupFileName = `gampas-v${currentVersion}.zip`;
const backupFilePath = path.join(backupsDir, backupFileName);

console.log(`🤐 Creating backup zip: ${backupFileName}...`);
try {
  // Exclude node_modules, git, builds, etc.
  execSync(`zip -r "${backupFilePath}" client server version.json package.json backup.js -x "*/node_modules/*" "*/.git/*" "client/dist/*" "server/uploads/*" "server/db/*.db-wal" "server/db/*.db-shm"`, {
    cwd: __dirname,
    stdio: 'inherit'
  });
  console.log(`✅ Backup successfully created at: ${backupFilePath}`);
} catch (err) {
  console.error('❌ Failed to create backup zip:', err.message);
  process.exit(1);
}

// 4. Manage backup history (Keep latest 5 zips)
const files = fs.readdirSync(backupsDir)
  .filter(file => file.startsWith('gampas-v') && file.endsWith('.zip'))
  .map(file => ({
    name: file,
    path: path.join(backupsDir, file),
    time: fs.statSync(path.join(backupsDir, file)).mtime.getTime()
  }))
  .sort((a, b) => b.time - a.time); // newest first

if (files.length > 5) {
  const toDelete = files.slice(5);
  toDelete.forEach(file => {
    console.log(`🗑️ Deleting old backup: ${file.name}`);
    fs.unlinkSync(file.path);
  });
}

// 5. Increment version (patch version)
const parts = currentVersion.split('.').map(Number);
parts[2] += 1; // Increment patch
const nextVersion = parts.join('.');

versionData.version = nextVersion;
fs.writeFileSync(versionFilePath, JSON.stringify(versionData, null, 2), 'utf8');
console.log(`🚀 Version advanced to: ${nextVersion}`);
