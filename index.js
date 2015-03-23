var fs = require('fs');

/**
 * buildSQLScript
 *   - Uses command line argument for name of WXR file
 *   - Reads WXR file
 *   TODO: - Converts post objects into values for db
 *   TODO: - Creates series of SQL 'insert' commands
 *   TODO: - Writes the series of commands into an output file.
 *
 *   Yes I know this is not the most space or time efficient approach.
 */
var buildSQLScript = function(){
  var filename = process.argv[2];
  if (!filename.length) {
    throw new Error('ERROR: You must provide the WXR filename as a command line argument.');
  }

  var fileContents = fs.readFileSync(filename, { encoding: 'utf8' });

  console.log(fileContents.slice(0, 10));
  //var sqlStatements =  generate the sqlStatements and push into array.
  //fs.writeFileSync('insertWPPosts-' + Date.now() + '.sql', sqlStatements.join(''));
};

buildSQLScript();
