"use strict";

module.exports = function(app, reviewModel) {
    app.post("/api/project/review", createReview);
    app.get("/api/project/reviews/:userId", getReviews);
    app.get("/api/project/review/:id", getReviewById);
    app.put("/api/project/review/:id", updateReview);
    app.delete("/api/project/review/:id", deleteReview);

    function createReview(req, res) {
        var review = req.body;
        res.send(reviewModel.Create(review));
    }

    function getReviews(req, res) {
        var userId = req.params.userId;
        res.json(reviewModel.FindAll(userId))
    }

    function getReviewById(req, res) {
        var id = req.params.id;
        res.json(reviewModel.FindById(id));
    }

    function updateReview(req, res) {
        var id = req.params.id;
        var review = req.body;
        res.json(reviewModel.Update(id, review));
    }

    function deleteReview(req, res) {
        var id = req.params.id;
        res.json(reviewModel.Delete(id));
    }
}