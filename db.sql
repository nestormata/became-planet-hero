Create Table Users  (
	UserID integer UNSIGNED NOT NULL AUTO_INCREMENT,
	LastName varchar(70) NOT NULL,
	FirstName varchar(50) NOT NULL,
	Email varchar(100) NOT NULL,
	Country char(2) NOT NULL,
	City varchar(30) NOT NULL,
	Registered timestamp default now(),
	PRIMARY KEY (UserID),
	UNIQUE KEY (Email)
);

Create Table Events (
	EventID integer unsigned NOT NULL auto_increment,
	Type tinyint unsigned not null,
	Name varchar(50) not null,
	OcurrDate DATE not null,
	Description text not null,
	PRIMARY KEY (EventID),
	INDEX (Type)
);

Create Table EventParticipants (
	EventID integer unsigned NOT NULL,
	UserID integer unsigned NOT NULL,
	Status tinyint unsigned NOT NULL,
	PRIMARY KEY (EventID, UserID),
	FOREIGN KEY (EventID) REFERENCES Events(EventID),
	FOREIGN KEY (UserID) REFERENCES Users(UserID)
);

Create Table Challenges  (
	ChallengeID integer unsigned NOT NULL auto_increment,
	Type tinyint unsigned not null,
	Name varchar(70),
	Description text,
	PRIMARY KEY (ChallengeID)
);

Create Table UserChallenges (
	UserID integer unsigned NOT NULL,
	ChallengeID integer unsigned NOT NULL,
	CompletedDate timestamp,
	PRIMARY KEY (UserID,ChallengeID),
	FOREIGN KEY (UserID) REFERENCES Users(UserID),
	FOREIGN KEY (ChallengeID) REFERENCES Challenges(ChallengeID)
);

Create Table Teams  (
	TeamID integer unsigned NOT NULL auto_increment,
	TeamName varchar(50),
	TeamDescription text,
	PRIMARY KEY (TeamID)
);

CREATE TABLE TeamMembers (
	TeamID integer unsigned not null,
	UserID integer unsigned not null,
	PRIMARY KEY (TeamID, UserID),
	FOREIGN KEY (TeamID) REFERENCES Teams(TeamID),
	FOREIGN KEY (UserID) REFERENCES Users(UserID)
);

CREATE TABLE Badges (
	BadgeID integer unsigned not null auto_increment,
	Name varchar(30) not null,
	Description text not null,
	identifier char(10) not null,
	PRIMARY KEY (BadgeID)
);

CREATE TABLE Earned (
	UserID integer unsigned not null,
	BadgeID integer unsigned null,
	Points integer unsigned,
	INDEX (UserID)
);
