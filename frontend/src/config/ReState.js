const state = {
   login: {
     username: "",
     password: ""
   },
   register: {
     username: "",
     password: "",
     profilePic: ""
   },
   isloggedIn: false,
   tweetData: {
     currentTweet: ""
   },
   message: "",
   loading: false,
   profileData: {
     username: "",
     bio: "",
     followings: "",
     followers: "",
     posts: "",
     current: false
   },
   editingProfileData: {
     username: "",
     bio: ""
   },
   settingsData: {
     themeMode: true,
     changePassword: {
       main: "",
       confirmation: ""
     }
   },
   search: "",
   nav: 0,
   url: "http://192.168.43.191:5001/",
   fetched: {
     allTweets: [],
     searchedUsers: [],
     currentUser: {
       username: "",
       token: ""
     }
   }
 };

 export default state;