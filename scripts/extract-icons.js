import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const iconsDir = path.resolve(__dirname, '../../temp_redax_sounds/src/client/icons');
const outputDir = path.resolve(__dirname, '../src/assets');
const outputFile = path.join(outputDir, 'icons.json');

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

const icons = {};

fs.readdirSync(iconsDir).forEach(file => {
  if (file.endsWith('.js') && file !== 'index.js') {
    const content = fs.readFileSync(path.join(iconsDir, file), 'utf-8');
    
    // Extract the SVG content (everything inside <svg ...> ... </svg>)
    // We'll just extract the inner HTML of the SVG for simplicity
    // and the viewBox if possible.
    
    const viewBoxMatch = content.match(/viewBox="([^"]+)"/);
    const viewBox = viewBoxMatch ? viewBoxMatch[1] : '0 0 512 512';
    
    // Remove the wrapper and get inner content
    // This is a rough regex, might need adjustment based on file content
    let innerContent = content.replace(/import .*?;/, '')
                              .replace(/const .*? = props => \(/, '')
                              .replace(/<svg .*?>/, '')
                              .replace(/\);/, '')
                              .replace(/export default .*?;/, '')
                              .replace(/<\/svg>/, '')
                              .trim();

    // Clean up React specific syntax
    innerContent = innerContent.replace(/className=/g, 'class=');
    innerContent = innerContent.replace(/fill="([^"]+)"/g, (match, p1) => `fill="${p1}"`); // Keep original colors
    
    // Remove {...props}
    innerContent = innerContent.replace(/\{\.\.\.props\}/g, '');

    const iconName = file.replace('.js', '');
    // Convert CamelCase to snake_case for matching with constants.js if needed
    // But constants.js uses keys like 'rain_light', and icon file is 'RainLight.js'
    // We will map them later.
    
    icons[iconName] = {
      viewBox,
      content: innerContent
    };
  }
});

fs.writeFileSync(outputFile, JSON.stringify(icons, null, 2));
console.log(`Extracted ${Object.keys(icons).length} icons to ${outputFile}`);
