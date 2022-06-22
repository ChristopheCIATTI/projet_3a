CREATE TABLE `article` (
  `id` int(11) NOT NULL,
  `author_id` int(11) DEFAULT NULL,
  `parent_id` int(11) DEFAULT NULL,
  `title` int(11) NOT NULL,
  `meta_title` text DEFAULT NULL,
  `slug` varchar(255) DEFAULT NULL,
  `summary` varchar(255) DEFAULT NULL,
  `published` tinyint(1) NOT NULL,
  `created_at` date NOT NULL,
  `updated_at` date NOT NULL,
  `published_at` date NOT NULL,
  `content` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

ALTER TABLE `article`
ADD PRIMARY KEY (`id`);

ALTER TABLE `article`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
COMMIT;
