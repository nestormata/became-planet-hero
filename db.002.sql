ALTER TABLE Users ADD COLUMN Status tinyint NOT NULL AFTER FBID;
-- Status 0 - account active
-- Status 1 - account banned

CREATE TABLE UserBans (
	BanID integer unsigned primary key not null auto_increment,
	UserID integer unsigned not null,
	InitializerID integer unsigned not null,
	OcurrDate timestamp default now(),
	foreign key (UserID) references Users(UserID),
	foreign key (InitializerID) references Users(UserID)
);

ALTER TABLE Teams ADD COLUMN OwnerID integer unsigned NOT NULL after TeamID;
ALTER TABLE Teams ADD FOREIGN KEY (OwnerID) REFERENCES Users(UserID);
