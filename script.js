    /*
    Challenge:
    1. Put all of the data in its own file called
    data.js, and export it back into index.js. 
    Make any changes to index.html that are
    necessary to make this work.
    2. Log out tweetsData.
    */
    import { tweetsData } from "./data.js";
    const tweetInput = document.getElementById('tweet-input');
    const tweetBtn = document.getElementById('tweet-btn');

    tweetBtn.addEventListener('click', () => console.log(tweetInput.value));

    document.addEventListener('click', function(e){
        /*
        Challenge:
        1. When a like icon is clicked, this function 
            should log out the contents of the 'data-like' 
            data-attribute.
        
        ⚠️ Clicking on the page but not on the like icon
            will log out 'undefined'. That is absolutely fine.
        */
        // console.log(e.target.dataset.like);
        /*
        Challenge:
        1. If a like icon has been clicked, call handleLikeClick
        passing in the uuid that is stored in the like icon's 
        data attribute. 
        */
        if (e.target.dataset.like) {
            handleLikeClick(e.target.dataset.like);
        }
    })

    function handleLikeClick(tweetId){
        /*
        Challenge:
        2. handleLikeClick should take in a parameter. 
        You can call this parameter 'tweetId'. For 
        now just log out tweetId.
        */
        console.log(tweetId);

        /*
        Challenge:
        1. Iterate over tweetsData and use the uuid 
        saved in tweetId to identify the liked
        tweet's object. Save that object to a 
        new const called 'targetTweetObj'.
        ⚠️ targetTweetObj should hold an object, NOT
        an array.
        2. Increment targetTweetObj's 'likes' count 
        by 1.
        3. Log out targetTweetObj
        */
       
        const targetTweetObj =  tweetsData.filter(likedTweetObj => {
            return likedTweetObj.uuid === tweetId;
        })[0];

        /*
        Challenge:
        1. When a tweet is liked, it's 'isLiked' property
        should be set to true.
        2. When a tweet is unliked, it's 'isLiked' property
        should be set to false and its 'likes' count
        should be decremented.
        */  
        if (!targetTweetObj.isLiked) {
            targetTweetObj.isLiked = !targetTweetObj.isLiked;
            targetTweetObj.likes++
        }
        else {
            targetTweetObj.isLiked = !targetTweetObj.isLiked;
            targetTweetObj.likes--;
        }
        render();
    }

    function getFeedHtml() {
        /*
        Challenge:
        1. Use a "for of" to iterate over the data and 
            create HTML string for each tweet using the 
            boilerplate below. Replace UPPERCASE text
            with data from the tweets. 
        2. Store this HTML in a let called "feedHtml".
        3. Log out feedHtml.
        4. Call getFeedHtml to check it's working.
        */  
        let feedHtml = '';
        /*
        Challenge:
        1. Replace the for of with a forEach.
        */
        tweetsData.forEach(tweet => {
            /*
        Challenge:
        1. Inside each span that has a class of "tweet-detail",
        add an <i> tag.
        2. Give each <i> tag the classes it needs to render the
        correct icons next to the numbers.
        The classes you will need are:
            fa-regular, 
            fa-solid, 
            fa-comment-dots, 
            fa-heart, 
            fa-retweet
        */

        /*
        Challenge:
        1. Add data attributes to each of the  <i> tags. You can call
        them 'reply', 'like', and 'retweet’.
        2. Each data attribute should hold the tweet's uuid.
        */
                    feedHtml += `
            <div class="tweet">
            <div class="tweet-inner">
                <img src="${tweet.profilePic}" class="profile-pic">
                <div>
                    <p class="handle">${tweet.handle}</p>
                    <p class="tweet-text">${tweet.tweetText}</p>
                    <div class="tweet-details">
                        <span class="tweet-detail">
                            <i class="fa-regular fa-comment-dots" data-reply="${tweet.uuid}"></i>
                            ${tweet.replies.length}
                        </span>
                        <span class="tweet-detail">
                            <i class="fa-solid fa-retweet" data-retweet="${tweet.uuid}"></i>
                            ${tweet.retweets}
                        </span>
                        <span class="tweet-detail">
                            <i class="fa-solid fa-heart" data-like="${tweet.uuid}"></i>
                            ${tweet.likes}
                        </span>
                    </div>   
                </div>            
            </div>
        </div>
            `;
        });
        return feedHtml;
    }

    function render(){
        /*
        Challenge:
        1. Take control of the ‘feed’ div.
        2. Render the HTML returned by the getFeedHtml 
            function to the 'feed' div. 
            See if you can do this with just one line of code!
        */
        document.getElementById('feed').innerHTML = getFeedHtml();
        }
        
    // call render
    render();