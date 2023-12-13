const setUsers = (User) => {
    User.create({ username: "Nathan", password: "lol" })
}

module.exports = { setUsers }