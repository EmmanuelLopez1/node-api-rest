const authenticatedUserExist = (req, res) => {
    // verify authenticatedUser is in request 
    if (!req.authenticatedUser) {
        return res.status(500).json({
            msg: "authenticatedUser not found"
        })
    }
}

const isAdminRole = (req, res, next) => {
    authenticatedUserExist(req, res)

    const { role, name } = req.authenticatedUser

    if (role !== 'ADMIN_ROLE') {
        return res.status(401).json({
            msg: `${name} doesnt have admin permissions`
        })
    }

    next()
}

const verifyRole = (roles) => {
    return (req, res, next) => {
        authenticatedUserExist(req, res)

        const { role } = req.authenticatedUser

        if(!roles.includes(role)){
            return  res.status(401).json({
                masg:`Just these roles ' ${roles.join(' ')} ' can use this endpoint`
            })
        }

        next()
    }
}

export {
    isAdminRole,
    verifyRole
}