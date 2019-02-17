const solution = (function () {
    let balance = 0;
    let rating = "";
    let upvotes = 0;
    let downvotes = 0;
    let result = [];
    return {
        call: function (currObj, currArg) {
            upvotes = currObj.upvotes;
            downvotes = currObj.downvotes
            balance = upvotes - downvotes;
            let posts = upvotes + downvotes;
            let reportedUpvotes = upvotes;
            let reportedDownvotes = downvotes;
            if (posts > 50) {
                let maxVote = Math.max(upvotes, downvotes);
                reportedUpvotes = Math.ceil(maxVote * 0.25) + upvotes;
                reportedDownvotes = Math.ceil(maxVote * 0.25) + downvotes;
            }
            let majority = upvotes / posts;
            if (posts > 9 && majority > 0.66) {
                rating = "hot";
            } else if (majority <= 0.66 && balance >= 0 && posts > 100) {
                rating = "controversial";
            } else if (balance < 0) {
                if (posts < 10) {
                    rating = "new";
                } else {
                    rating = "unpopular";
                }
            } else {
                rating = "new";
            }
            result = [reportedUpvotes, reportedDownvotes, balance, rating];
            switch (currArg) {
                case "upvote":
                    return currObj.upvotes++;
                    break;
                case "downvote":
                    return currObj.downvotes++;
                    break;
                case "score":
                    //return console.log(`[${reportedUpvotes}, ${reportedDownvotes}, ${balance}, ${rating}]`);
                    return result;
                    break;
                default: break;
            }
        }
    }
})();

//let solution = getSolution();
let post = {
    id: '1234',
    author: 'author name',
    content: 'these fields are irrelevant',
    upvotes: 132,
    downvotes: 68
};
let score = solution.call(post, 'score');
// solution.call(post, 'downvote');
// score = solution.call(post, 'score')
// solution.call(post, 'upvote');
// solution.call(post, 'upvote');
// score = solution.call(post, 'score')
// for (let i = 0; i < 38; i++) {
//    solution.call(post, 'upvote')
//  }
//  score = solution.call(post, 'score');
// solution.call(post, 'downvote');
// score = solution.call(post, 'score')
