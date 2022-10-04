    /*
    Challenge:
    1. Put all of the data in its own file called
    data.js, and export it back into index.js. 
    Make any changes to index.html that are
    necessary to make this work.
    2. Log out tweetsData.
    */
    import { tweetsData } from "./data.js";
    /*
    Challenge:
    1. Bring in uuidjs.
    */
    import { v4 as uuidv4 } from 'https://jspm.dev/uuid';

    /*
    Challenge:
    1. Somewhere in this file there is a line of code 
    we no longer need. Find it and delete it!
    */ 

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

        /*

        Challenge:
        1. Make this eventListener call "handleRetweetClick" 
        when the retweet icon is clicked, passing in the
        uuid from that tweet.  
        */
        else if(e.target.dataset.retweet) {
            handleRetweetClick(e.target.dataset.retweet);
        }

        else if(e.target.dataset.reply){
            handleReplyClick(e.target.dataset.reply);
        }

        else if(e.target.id === 'tweet-btn') {
            handleTweetBtnClick();
        }
    })

    function handleLikeClick(tweetId){
        /*
        Challenge:
        2. handleLikeClick should take in a parameter. 
        You can call this parameter 'tweetId'. For 
        now just log out tweetId.
        */
        // console.log(tweetId);

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
       
        const targetTweetObj =  tweetsData.filter(tweetObj => tweetObj.uuid === tweetId)[0];

        /*
        Challenge:
        1. When a tweet is liked, it's 'isLiked' property
        should be set to true.
        2. When a tweet is unliked, it's 'isLiked' property
        should be set to false and its 'likes' count
        should be decremented.
        */  
        if (!targetTweetObj.isLiked) {
            targetTweetObj.likes++
        }
        else {
            targetTweetObj.likes--;
        }
        targetTweetObj.isLiked = !targetTweetObj.isLiked;
        render();
    }

    function handleRetweetClick(tweetId){
        /*
        Challenge:
        2. Find the retweeted tweet's object in tweetsData 
            and save it to a const.
        3. Increment or decrement the retweet count of the 
            tweet and flip its isRetweeted boolean.
        4. Call the render function.  
        */   
        const targetedTweetObj = tweetsData.filter(tweet => tweet.uuid === tweetId)[0];

        if (!targetedTweetObj.isRetweeted) {
            targetedTweetObj.retweets++;
        }
        else {
            targetedTweetObj.retweets--;
        }
        targetedTweetObj.isRetweeted = !targetedTweetObj.isRetweeted;
        render();
    }

    function handleReplyClick(replyId){
        /*
        Challenge:
        1. Use the uuid stored in 'replyId' to take control 
           of the div containing that tweet’s replies. 
           (Check the HTML string below to remind yourself 
           what id that div will have.)  
        2. Toggle the CSS class "hidden" on that div. 
        */ 
        document.getElementById(`replies-${replyId}`).classList.toggle('hidden');
    }

    function handleTweetBtnClick(){
        const tweetInput = document.getElementById('tweet-input');
        /*
        Challenge:
        2. When the Tweet button is clicked, log out an object
        for a new tweet. Make sure you include the text of 
        the tweet (how can you get that?) and a unique 
        identifier using uuidjs.
        
        The handle @Scrimba (or whatever you prefer) and 
        the profile pic scrimbalogo.png can be hard-coded.
        */ 
        const newTweet = {
            handle: `@Scrimba`,
            profilePic: `images/scrimbalogo.png`,
            likes: 0,
            retweets: 0,
            tweetText: tweetInput.value,
            replies: [],
            isLiked: false,
            isRetweeted: false,
            uuid: uuidv4(),
        };
        // console.log(newTweet);

        /*
        Challenge:
        1. Add the new tweet object to 'tweetsData'
        and make it render at the top of the feed. 
        */ 
        /*
        Challenge:
        1. No empty tweets!
        2. Clear the textarea after tweeting!
        */
        if (tweetInput.value) {
            tweetsData.unshift(newTweet);
            tweetInput.value = '';
            render();
        }
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

        /*
        Challenge:
        1. Use an if statement to set the value of 
        'likeIconClass' to the string 'liked' 
        if the tweet has been liked. 
        2. In the like icon tag, add 'likeIconClass' 
        to the list of classes.
        */    
            let likeIconClass = '';
            if (tweet.isLiked) {
                likeIconClass = 'liked';
            }

            /*
            Challenge:
            1. Use an if statement to set the value of 
            'retweetIconClass' to the string 
            'retweeted' if the tweet has been retweeted. 
            2. In the retweet icon tag, add 'retweetIconClass' 
            to the list of classes.
            */
            let retweetIconClass = '';
            if(tweet.isRetweeted) {
                retweetIconClass = 'retweeted';
            }

            let repliesHtml = '';
            /*
            Challenge:
            1. Use an if statement to check if a tweet has replies.
            2. If it does, log out the uuid for that tweet.
            */
            /*
            Challenge:
            1. If a tweet has replies, iterate through the replies
            and wrap each one in the HTML template provided below. 
            Make sure to replace words in UPPERCASE with data from 
            the tweet. On each iteration, add this HTML to repliesHtml.
            
            <div class="tweet-reply">
                <div class="tweet-inner">
                    <img src="PROFILE PIC" class="profile-pic">
                        <div>
                            <p class="handle">HANDLE</p>
                            <p class="tweet-text">TWEET TEXT</p>
                        </div>
                    </div>
            </div>
            */
            if (tweet.replies.length > 0) {
                // console.log(tweet.uuid);
                tweet.replies.forEach(reply => {
                    repliesHtml += `
                    <div class="tweet-reply">
                    <div class="tweet-inner">
                        <img src="${reply.profilePic}" class="profile-pic">
                            <div>
                                <p class="handle">${reply.handle}</p>
                                <p class="tweet-text">${reply.tweetText}</p>
                            </div>
                        </div>
                    </div>
                    `;
                })
            }

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
                            <i class="fa-solid fa-retweet ${retweetIconClass}" data-retweet="${tweet.uuid}"></i>
                            ${tweet.retweets}
                        </span>
                        <span class="tweet-detail">
                            <i class="fa-solid fa-heart ${likeIconClass}" data-like="${tweet.uuid}"></i>
                            ${tweet.likes}
                        </span>
                    </div>   
                </div>            
            </div>
            <div class="hidden" id="replies-${tweet.uuid}">
            <!-- REPLIES HERE -->
            ${repliesHtml}
            </div>   
        </div>
            `;
            /*
            Challenge:
            2. Place repliesHtml in its parent div remembering 
            to update that divs id.
            */
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