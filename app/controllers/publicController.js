const showHomePage = (req, res) => {
    res.render("home", {
        error: null
    });
}

const showContactPage = (req, res) => {
    res.render("contact", {
        error: null
    });
}

const showServicePage = (req, res) => {
    res.render("services", {
        error: null
    });
}

const showProfilePage = (req, res) => {
    if(!req.session.user) {
        return res.redirect("/auth/login");
    }
    res.render("profile", {
        user: req.session.user,
        error: null
    });
}


export {
    showHomePage,
    showContactPage,
    showServicePage,
    showProfilePage
};
