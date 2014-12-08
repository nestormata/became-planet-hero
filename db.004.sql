ALTER TABLE Badges ADD COLUMN Points integer unsigned NOT NULL AFTER BadgeID;

ALTER TABLE Challenges ADD COLUMN Points integer unsigned NOT NULL AFTER ChallengeID;

ALTER TABLE Earned ADD COLUMN Time timestamp default now() AFTER Points;