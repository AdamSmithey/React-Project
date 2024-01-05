module.exports = app => {
    const contents = require("../controller/content.controller.js");

    let router = require("express").Router();

    router.post("/", contents.create);

    router.get("/", contents.findAll);

    router.delete('/:id', contents.delete);

    app.use('/api/contents', router);
};