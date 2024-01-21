const bcrypt = require('bcrypt')

const setUsers = async (User) => {
    try {
        const usersData = [
            { id: 1, username: "Nathan", password: "lol", RoleId: 1 },
            { id: 2, username: "Mathias", password: "lol", RoleId: 3 },
            { id: 3, username: "Maxime", password: "lol", RoleId: 3 },
            { id: 4, username: "Dorian", password: "lol", RoleId: 3 }
        ];

        // Promise.all pour attendre toutes les promesses de hachage
        const hashedPasswords = await Promise.all(
            usersData.map(async (user) => {
                const hash = await bcrypt.hash(user.password, 10);
                return { ...user, password: hash };
            })
        );

        // Promise.all pour attendre toutes les promesses de création d'utilisateur
        await Promise.all(
            hashedPasswords.map(async (user) => {
                await User.create(user);
            })
        );

    } catch (error) {
        console.error('Error creating users:', error.message);
    }
};


const setProfils = (Profil) => {
    return Promise.all([
        Profil.create({ id: 1, inGameName: "Draconiros", profilBio: "Cherche quelqu'un de bon pour m'apprendre à jouer", UserId: 1 }),
        Profil.create({ id: 2, inGameName: "Orukam", profilBio: "Cherche quelqu'un de bon pour m'apprendre à jouer", UserId: 2 }),
        Profil.create({ id: 3, inGameName: "Tylezia", profilBio: "Cherche quelqu'un de bon pour m'apprendre à jouer", UserId: 3 }),
        Profil.create({ id: 4, inGameName: "Meriana", profilBio: "Cherche quelqu'un de bon pour m'apprendre à jouer", UserId: 4 })
    ])
}

const setRoles = (Role) => {
    return Promise.all([
        Role.create({ id: 1, label: "superadmin" }),
        Role.create({ id: 2, label: "admin" }),
        Role.create({ id: 3, label: "edit" })
    ])
}

const setReviews = (Review) => {
    return Promise.all([
        Review.create({ content: "Super expérience de jeu avec X", rating: 5, UserId: 1, ProfilId: 2 })
    ])
}




module.exports = { setUsers, setRoles, setProfils, setReviews }