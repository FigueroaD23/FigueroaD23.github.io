# Path: readme.md

this repo is a simple example to fetch pokeapi endpoint and show some details of each pokemon
Builded with Vanilla JS, this repo is deployed at github pages in https://github.com/FigueroaD23/figueroad23.github.io
to automatic deploy this repo you have to commit a change and add a remote to your repo with the name of "ghpages" (or whatever) and the url of the repo
[README.md][1]

[1]: example to add git remote
git remote add ghpages https://github.com/FigueroaD23/figueroad23.github.io

then you have to commit and push to the remote
[README.md][1]

[1]: example to commit and push to ghpages
git commit -m "commit message"
git push ghpages master

and that's all, you have to wait a few minutes and your repo will be deployed at github pages

# Path: index.html

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Pokeapi</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <div class="container">
        <div class="poke-container">
            <div class="poke-img">
                <img src="" alt="">
            </div>
            <div class="poke-info">
                <h2 class="poke-name"></h2>
                <p class="poke-id"></p>
                <p class="poke-type"></p>
                <p class="poke-height"></p>
                <p class="poke-weight"></p>
            </div>
        </div>
        <div class="poke-btn-container">
            <button class="poke-btn">Get Pokemon</button>
        </div>
    </div>
    <script src="script.js"></script>
</body>
</html>
