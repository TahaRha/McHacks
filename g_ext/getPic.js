
console.log("Welcome to shrekon.com");

//image
let images = [
    "images/shrekon.jpg",
    "images/shrekon2.jpg"

]

//let profilePics = document.getElementsByClassName("css-1dbjc4n r-yfoy6g r-1wyvozj r-633pao r-u8s1d r-1v2oles r-desppf");

let website = document.getElementsByClassName("css-1dbjc4n")
let pfp = website.item(0).getElementsByClassName("css-1dbjc4n r-yfoy6g r-1wyvozj r-633pao r-u8s1d r-1v2oles r-desppf")

// website item 140?
//console.log(pfp.length);
//console.log(website.length);
for (element of website) {
    console.log(element);
}

// for (img of timeline) {
//     console.log(img);
// }




// for (img of whatever) {
//     let r = Math.floor(Math.random() * images.length)
//     let image = images[r];
//     let url = chrome.extension.getURL(image);
//     img.src = url;
//     console.log(url);

// }



//the timeline classname: "css-1dbjc4n"