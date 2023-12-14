const setUsers = (User) => {
    User.create({ username: "Nathan", password: "lol", RoleId: 1 })
    User.create({ username: "Mathias", password: "lol", RoleId: 2 })
    User.create({ username: "Maxime", password: "lol", RoleId: 3 })
    User.create({ username: "Dorian", password: "lol", RoleId: 3})
}

const setRoles = (Role) => {
    Role.create({ label: "superadmin"})
    Role.create({ label: "admin"})
    Role.create({ label: "edit"})
}

module.exports = { setUsers, setRoles }