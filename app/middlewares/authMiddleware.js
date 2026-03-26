const isAdmin = (req, res, next) => {
    if(!req.session.user) {
        return res.redirect("/auth/login");
    }

    if(req.session.user.role !== "admin") {
        return res.status(403).render("home", {
            error: "Nincs jogosultságod ehhez az oldalhoz!"
        });
    }

    next();
}

const isAuth = (req, res, next) => {
    if(!req.session.user) {
        return res.status.redirect("/auth/login");
    }

    next();
}

export {
    isAdmin,
    isAuth
};
