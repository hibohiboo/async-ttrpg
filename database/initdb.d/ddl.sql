CREATE TABLE atrpg.Character (
    CharacterID   NVARCHAR(128) NOT NULL PRIMARY KEY,
    CharacterName NVARCHAR(128) NOT NULL
);

CREATE TABLE atrpg.TransactionTest (
    TestID   NVARCHAR(128) NOT NULL,
    CreatedAt DATETIMEOFFSET NOT NULL,
    CONSTRAINT PK_TransactionTest PRIMARY KEY (TestID, CreatedAt)
);