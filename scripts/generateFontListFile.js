const fs = require('fs');
const path = require('path');

const folderPath = path.join(__dirname, '..', 'assets/fonts');

fs.readdir(folderPath, (err, files) => {
  if (err) {
    console.log('Error reading folder:', err);
    return;
  }

  const fileNames = files.filter((fileName) => {
    return fileName.endsWith('.flf') && fs.statSync(path.join(folderPath, fileName)).isFile();
  });
  const fileData = { fonts: fileNames.map((fileName) => {
    return fileName.replace('.flf','');
  })};
  const jsonFileName = path.join(__dirname, '..', 'assets/fontList.json')
  const jsonData = JSON.stringify(fileData, null, 2);
  fs.writeFile(jsonFileName, jsonData, (err) => {
    if (err) {
      console.log('Error :', err);
      return;
    }
    console.log('JSON font list file created.');
  });
});
