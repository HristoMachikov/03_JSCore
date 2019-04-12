handlers.allMemes = async function (ctx) {
    let res = await  memeService.getAllMemes()
    let result = res.forEach(meme => meme.isCreator = meme._acl.creator === sessionStorage.getItem('userId'))
    ctx.memes = result;
    console.log(ctx)
    ctx.lasdPartials({
        header: "../templates/common/header.hbs",
        footer: "../templates/common/footer.hbs",
        meme: "../templates/meme/singleMeme.hbs"
    }).then(function () {
        this.partial("../templates/meme/meme-feed.hbs")
    })
}