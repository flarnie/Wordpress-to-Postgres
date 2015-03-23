var fs = require('fs');
var parseString = require('xml2js').parseString;

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
  var parsedFileContents = parseString(fileContents, function(err, result) {
    if (err) {
      throw new Error(('xml2js failed with error: ' + err));
    } else {
      console.log(result);
    }
    //var sqlStatements =  generate the sqlStatements and push into array.
    //fs.writeFileSync('insertWPPosts-' + Date.now() + '.sql', sqlStatements.join(''));
  });
};

buildSQLScript();
