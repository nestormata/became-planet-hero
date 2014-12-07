DROP TABLE IF EXISTS UserBans, Earned, Badges, TeamMembers, Teams, UserChallenges, Challenges, EventParticipants, Events, Users;

Create Table Users  (
	UserID integer unsigned primary key not null AUTO_INCREMENT,
	LastName varchar(70) not null,
	FirstName varchar(50) not null,
	Email varchar(100) not null,
	Country char(2) not null,
	City varchar(30) not null,
	Registered timestamp default now(),
	UNIQUE KEY (Email)
);

Create Table Events (
	EventID integer unsigned primary key not null auto_increment,
	Type tinyint unsigned not null,
	Name varchar(50) not null,
	OcurrDate DATETIME not null,
	Description text not null,
	INDEX (Type)
);

Create Table EventParticipants (
	EventID integer unsigned not null,
	UserID integer unsigned not null,
	Status tinyint unsigned not null, -- 1 - participated, 0 - accepted the invitation but not visited
	primary key (EventID, UserID),
	foreign key (EventID) references Events(EventID),
	foreign key (UserID) references Users(UserID)
);

Create Table Challenges  (
	ChallengeID integer unsigned primary key not null auto_increment,
	Type tinyint unsigned not null,
	Name varchar(70),
	Description text
);

Create Table UserChallenges (
	UserID integer unsigned not null,
	ChallengeID integer unsigned not null,
	CompletedDate timestamp,
	primary key (UserID,ChallengeID),
	foreign key (UserID) references Users(UserID),
	foreign key (ChallengeID) references Challenges(ChallengeID)
);

Create Table Teams  (
	TeamID integer unsigned primary key not null auto_increment,
	TeamName varchar(50) not null,
	TeamDescription text
);

CREATE TABLE TeamMembers (
	TeamID integer unsigned not null,
	UserID integer unsigned not null,
	primary key (TeamID, UserID),
	foreign key (TeamID) references Teams(TeamID),
	foreign key (UserID) references Users(UserID)
);

CREATE TABLE Badges (
	BadgeID integer unsigned primary key not null auto_increment,
	Name varchar(30) not null,
	Description text not null,
	Identifier char(10) not null  -- Meta identifier for naming of icons, blocks, etc
);

CREATE TABLE Earned (
	UserID integer unsigned not null,
	BadgeID integer unsigned null,
	Points integer unsigned,
	INDEX (UserID)
);
