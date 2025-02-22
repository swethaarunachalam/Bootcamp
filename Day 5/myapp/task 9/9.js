const fs = require('fs');
const path = require('path');

function createFile(filename) {
  fs.writeFile(filename, '', (err) => {
    if (err) {
      console.error(`Error creating file: ${err.message}`);
    } else {
      console.log(`File "${filename}" created successfully.`);
    }
  });
}

function deleteFile(filename) {
  fs.unlink(filename, (err) => {
    if (err) {
      console.error(`Error deleting file: ${err.message}`);
    } else {
      console.log(`File "${filename}" deleted successfully.`);
    }
  });
}
const args = process.argv.slice(2);
if (args.length < 2) {
  console.log('Usage: my-tool <command> <filename>');
  console.log('Commands:');
  console.log('  create <filename>  - Create a new file');
  console.log('  delete <filename>  - Delete a file');
  process.exit(1);
}
const command = args[0];
const filename = args[1];
switch (command) {
  case 'create':
    createFile(filename);
    break;
  case 'delete':
    deleteFile(filename);
    break;
  default:
    console.log('Unknown command. Use "create" or "delete".');
    break;
}
