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

export {
    showHomePage,
    showContactPage
};
