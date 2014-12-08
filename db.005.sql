ALTER TABLE Users MODIFY COLUMN	`Status` tinyint unsigned not null default 0;
ALTER TABLE Users ADD COLUMN Image TEXT NULL AFTER City;
