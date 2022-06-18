
const whoami = (req, res) => {
    const currentUser = req.user;
    return res.json(currentUser)
}

module.exports = whoami