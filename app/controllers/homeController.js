const showHomePage = (req, res) => {
    res.render("home", {
        error: null
    });
}

export {
    showHomePage
};
