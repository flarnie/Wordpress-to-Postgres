CREATE TABLE wp_posts
  (wp_id number not null,
   post_date date not null,
   post_date_gmt date not null,
   post_content text,
   post_title character(150),
   post_excerpt character(150),
   post_status character(20)
  );
