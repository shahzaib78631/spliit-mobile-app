const fs = require("fs");
const path = require("path");

const uiFolder = "./components/ui"; // Path to your 'ui' folder

function organizeFiles() {
  const files = fs
    .readdirSync(uiFolder)
    .filter((file) => file.endsWith(".tsx"));

  const barrelExports = [];

  files.forEach((file) => {
    const fileName = file.replace(".tsx", "");
    const folderPath = path.join(uiFolder, fileName);

    // Create a folder for the file
    if (!fs.existsSync(folderPath)) {
      fs.mkdirSync(folderPath);
    }

    // Move the file into the folder
    const oldPath = path.join(uiFolder, file);
    const newPath = path.join(folderPath, file);
    fs.renameSync(oldPath, newPath);

    // Create an index.ts file for each folder
    const indexContent = `export { default } from './${fileName}';\n`;
    fs.writeFileSync(path.join(folderPath, "index.ts"), indexContent);

    // Add export to the barrel file
    barrelExports.push(
      `export { default as ${fileName} } from './${fileName}';`
    );
  });

  // Generate the barrel index.ts file
  const barrelContent = barrelExports.join("\n");
  fs.writeFileSync(path.join(uiFolder, "index.ts"), barrelContent);

  console.log("Files organized successfully!");
}

organizeFiles();
