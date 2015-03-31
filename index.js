#! /usr/bin/env node

var fs = require('fs');
var parseString = require('xml2js').parseString;
var format = require('pg-format');

/**
 * createSQLInsertStatement
 * @param {Object} postObject
 * @return {String}
 */
var createSQLInsertStatement = function(postObject) {
  var postId = postObject['wp:post_id'][0];
  var postDate = postObject['wp:post_date'][0].slice(0, 10);
  var postDateGMT = postObject['wp:post_date_gmt'][0].slice(0, 10);
  var postContent = postObject['content:encoded'][0];
  var postTitle = postObject['title'][0];
  var postExcerpt = postObject['excerpt:encoded'][0];
  var postStatus = postObject['wp:status'][0];
  var postLink = postObject['link'][0].match(/flarnie.com(.+)$/)[0];

  return format("INSERT INTO wp_posts (wp_id, post_date, post_date_gmt, post_content, post_title, post_excerpt, post_status, post_link)\n" +
  "  values (\n" +
  "    %L,\n" +
  "    to_date(%L, 'YYYY-MM-DD'),\n" +
  "    to_date(%L, 'YYYY-MM-DD'),\n" +
  "    %L,\n" +
  "    %L,\n" +
  "    %L,\n" +
  "    %L,\n" +
  "    %L\n" +
  '  );\n\n',
         postId,
         postDate,
         postDateGMT,
         postContent,
         postTitle,
         postExcerpt,
         postStatus,
         postLink
      );
};

/**
 * buildSQLScript
 *   - Uses command line argument for name of WXR file
 *   - Reads WXR file
 *   - Converts post objects into values for db
 *   - Creates series of SQL 'insert' commands
 *   - Writes the series of commands into an output file.
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
      var postObjects = result.rss.channel[0].item;
      var sqlStatements = [];
      postObjects.forEach(function(postObject) {
        sqlStatements.push(createSQLInsertStatement(postObject));
      });
      fs.writeFileSync('insertWPPosts-' + Date.now() + '.sql', sqlStatements.join(''));
    }
  });
};

buildSQLScript();
