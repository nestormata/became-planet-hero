ALTER TABLE Earned ADD FOREIGN KEY (UserID) REFERENCES Users(UserID);
--ALTER TABLE Earned ADD foreign key (BadgeID) references Badges(BadgeID); -- TBD