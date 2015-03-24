# Wordpress to PostgreSQL

This node.js script will translate the
[WXR file exported by WordPress][wp-export] into a script to create a PostgreSQL
database with the following structure:

Table: wp_posts
```
wp_id BIGINT(20)
post_author BIGINT(20)
post_date DATETIME
post_date_gmt DATETIME
post_content LONGTEXT
post_title TEXT
post_excerpt TEXT
post_status VARCHAR(20)
```

This is similar to the table used in [the WordPress MySQL database][wp-db] for
posts, but without as much cruft.

[wp-export]: http://codex.wordpress.org/Tools_Export_Screen
[wp-db]: https://codex.wordpress.org/images/9/97/WP3.8-ERD.png

## Setting Up

If you don't have an existing database, create one:
> createdb my_database

Create the 'posts' table in your database using the 'create_tables.sql' file
from this project:
> cat node_modules/wordpress_to_postgres/create_tables.sql | psql my_database

## How To Use

> wordpress_to_postgres yourusername.wordpress.2015-03-22.xml

That will generate a file with the prefix 'insert-posts' and a date-in-ms number
appended to the end to make it unique. Use that file to add your blog posts to
the database, like so:

> cat insertPosts-1426965702734.sql | psql my_database

That's it!
