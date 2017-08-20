# Let's vote!
a simple voting page build on top of React, Redux, Redux-Saga and WebSocket

## [DEMO](https://boiling-reef-67497.herokuapp.com/)

## scripts
`yarn test` will start the `eslint` first, and then run testing  
`yarn dev` will start an express server with `webpack-dev-middleware`  
`yarn build` will build production code of frontend, the result will be in the folder of `static/js/bundle.js`  
`yarn start` will simply start the express server without `webpack-dev-middleware`  

## File structure
`application` contains the api and websocket server  
`web` contains the source code of frontend  
`static` is the folder of express server to keep static/compiled frontend files  

## How the order of posts work
The program uses an [in-memory array](https://github.com/eric7578/voters/blob/master/application/services/storage.js#L1) to keep all the posts. Once a new post is inserted, it will reorder all the posts based on the number of upvote descendingly. If there are more than one posts with the same number of upvote, the inserted post will be prior to the others. The logic of reordering is in the function of [`findInsertPosition`](https://github.com/eric7578/voters/blob/master/application/services/postFeed.js#L70-L87)

Once the users hit the **upvote** button of a post, it will first remove the target post from all the posts, and increase the number of upvote. Then, it will find the location according to the reorder rule mentioned above, and insert the target post back. So that, the logic of `findInsertPostion` could be reused. The logic of upvote is in the function of [`upvote`](https://github.com/eric7578/voters/blob/master/application/webSocketServer.js#L65-L75)

Once the users hit the **downvote** button, it simply increases the number of downvote without doing any further reordering. The logic of downvote is in the function of [`downvote`](https://github.com/eric7578/voters/blob/master/application/webSocketServer.js#L77-L87)

## How the sockets works
Every user connected to the page has a **range** with two properties `from` and `to`. If there are any changes happended in the range, the server will push UPDATE message to the user. Once a new websocket is connected, the redux-saga will first set range from 1 to 20 as default. When the users click on the **More** or **Previous** button which will appear after there are more than 20 posts, it will send a message to the server to change the **range**. The logic of sending to the client is in the function of [`broadcastEffectRanges`](https://github.com/eric7578/voters/blob/master/application/webSocketServer.js#L103-L113)
