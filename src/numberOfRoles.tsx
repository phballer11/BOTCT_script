interface numberOfRoles {
    numberOfPlayers: number
    townsfolkCounts: number;
    outsiderCounts: number;
    minionCounts: number;
}

export const getRoles = (numberOfPlayers: number): numberOfRoles => {
    switch (numberOfPlayers) {
        case 5:
            return { numberOfPlayers, townsfolkCounts: 3, outsiderCounts: 0, minionCounts: 1 };
        case 6:
            return { numberOfPlayers, townsfolkCounts: 3, outsiderCounts: 1, minionCounts: 1 };
        case 7:
            return { numberOfPlayers, townsfolkCounts: 5, outsiderCounts: 0, minionCounts: 1 };
        case 8:
            return { numberOfPlayers, townsfolkCounts: 5, outsiderCounts: 1, minionCounts: 1 };
        case 9:
            return { numberOfPlayers, townsfolkCounts: 5, outsiderCounts: 2, minionCounts: 1 };
        case 10:
            return { numberOfPlayers, townsfolkCounts: 7, outsiderCounts: 0, minionCounts: 2 };
        case 11:
            return { numberOfPlayers, townsfolkCounts: 7, outsiderCounts: 1, minionCounts: 2 };
        case 12:
            return { numberOfPlayers, townsfolkCounts: 7, outsiderCounts: 2, minionCounts: 2 };
        case 13:
            return { numberOfPlayers, townsfolkCounts: 9, outsiderCounts: 0, minionCounts: 3 };
        case 14:
            return { numberOfPlayers, townsfolkCounts: 9, outsiderCounts: 1, minionCounts: 3 };
        case 15:
            return { numberOfPlayers, townsfolkCounts: 9, outsiderCounts: 2, minionCounts: 3 };
        default:
            alert('Please check the number of players and roles');
            return { numberOfPlayers: 0, townsfolkCounts: 0, outsiderCounts: 0, minionCounts: 0 };
    }
}