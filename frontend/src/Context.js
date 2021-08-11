import React, { Component } from "react";
import EmptyState from "./config/ReState";

const MainContext = React.createContext(null);

class MainProvider extends Component {
  state = {
    login: {
      username: "",
      password: ""
    },
    depends: 0,
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
      id: "",
      username: "",
      bio: "",
      followings: "",
      followers: "",
      posts: "",
      current: false,
      following: false,
      picture: ""
    },
    editingProfileData: {
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
    url: "http://localhost:5001/",
    fetched: {
      allTweets: [],
      searchedUsers: [],
      currentUser: {
        username: "",
        token: "",
        picture: "",
      }
    }
  };

  componentDidMount = () => {

    const jdata = localStorage.getItem("login_jack");
    const currentTime = new Date().getTime();
    const tokenTime = JSON.parse(localStorage.getItem("login_time_jack"));
    const currentProfile = JSON.parse(localStorage.getItem("profile_data_jack"));
    if (tokenTime && currentTime) {
      if (currentTime <= tokenTime + 24 * 60 * 60 * 1000) {
        const data = JSON.parse(jdata);
        if (data) {
          this.setState(state => ({
            ...state,
            isloggedIn: true,
            depends: ++state.depends,
            profileData: currentProfile,
            fetched: {
              ...state.fetched,
              currentUser: {
                username: data.username,
                token: data.token,
                picture: data.picture
              }
            }
          }));
        }
      }
    }
  };

  change = {
    currentTweet: e => {
      this.setState(state => ({
        ...state,
        tweetData: {
          currentTweet: e.target.innerHTML
        }
      }));
    },
    profileData: e => {
      switch (e.target.getAttribute("id")) {
        case "bio":
          this.setState(state => ({
            ...state,
            editingProfileData: {
              ...state.editingProfileData,
              bio: e.target.innerHTML
            }
          }));
          break;
        default:
          break;
      }
    },
    settingsData: e => {
      const data = e.target.value;
      switch (e.target.getAttribute("id")) {
        case "themeMode":
          this.setState(state => ({
            ...state,
            settingsData: {
              ...state.settingsData,
              themeMode: !state.themeMode
            }
          }));
          break;
        case "mainPassword":
          this.setState(state => ({
            ...state,
            settingsData: {
              ...state.settingsData,
              changePassword: {
                ...state.settingsData.changePassword,
                main: data
              }
            }
          }));
          break;
        case "confirmPassword":
          this.setState(state => ({
            ...state,
            settingsData: {
              ...state.settingsData,
              changePassword: {
                ...state.settingsData.changePassword,
                confirmation: data
              }
            }
          }));
          break;
        default:
          break;
      }
    },

    setSearch: e => {
      e.preventDefault();
      const value = e.target.value;
      this.setState(state => ({
        ...state,
        search: value
      }));
    },
    setNav: num => {
      this.setState(state => ({
        ...state,
        nav: num
      }));
    },

    setLogin: e => {
      const data = e.target.value;
      switch (e.target.getAttribute("id")) {
        case "username":
          this.setState(state => ({
            ...state,
            login: {
              ...state.login,
              username: data
            }
          }));
          break;
        case "password":
          this.setState(state => ({
            ...state,
            login: {
              ...state.login,
              password: data
            }
          }));
          break;
        default:
          return;
      }
    }
  };

  dataMethods = {
    allTweets: async () => {
      const url = this.state.url + "posts/timeline/all";
      const jdata = await fetch(url, {
        method: "get",
        headers: {
          "x-access-token": this.state.fetched.currentUser.token
        }
      });

      if (jdata.ok) {
          const data = await jdata.json();
          this.setState(state => ({
            ...state,
            fetched: {
              ...state.fetched,
              allTweets: data
            }
          }));
        } else {
          console.log(await jdata.json());
        }
    },
    searchedUsers: async (e) => {

        e.preventDefault();
        const value = e.target.value;
        this.setState(state => ({
          ...state,
          search: value
        }));

        if(value === "" || !value){
          return;
        }

      const url = this.state.url + `profile/search/${value}`;
      const jdata = await fetch(url, {
        method: "get",
        headers: {
          "x-access-token": this.state.fetched.currentUser.token
        }
      });
      if (jdata.ok) {
        const data = await jdata.json();
        this.setState(state => ({
          ...state,
          fetched: {
            ...state.fetched,
            searchedUsers: data
          }
        }));
      } else {
        console.log(await jdata.json());
      }
    },

    addTweet: async () => {
      const url = this.state.url + "posts";
      const bodyData = { content: this.state.tweetData.currentTweet };
      const jdata = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-access-token": this.state.fetched.currentUser.token
        },
        body: JSON.stringify(bodyData)
      });
      if (jdata.ok) {
        this.dataMethods.allTweets();
      } else {
        console.log(await jdata.json());
      }
    },

    likeTweet: async (id, likes) => {
      const url = this.state.url + "posts/like";
      const bodyData = { id: id, likes: likes };
      const jdata = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-access-token": this.state.fetched.currentUser.token
        },
        body: JSON.stringify(bodyData)
      });
      if (jdata.ok) {
        this.dataMethods.allTweets();
      } else {
        console.log(await jdata.json());
      }
    },

    unlikeTweet: async (id, likes) => {
      const url = this.state.url + "posts/unlike";
      const bodyData = { id: id, likes: likes };
      const jdata = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-access-token": this.state.fetched.currentUser.token
        },
        body: JSON.stringify(bodyData)
      });
      if (jdata.ok) {
        const data = await jdata.json();
        this.dataMethods.allTweets();
      } else {
        console.log(await jdata.json());
      }
    },

    fetchProfile: async username => {
      const url = this.state.url + "profile/" + username;
      const jdata = await fetch(url, {
        method: "get",
        headers: {
          "x-access-token": this.state.fetched.currentUser.token
        }
      });
      if (jdata.ok) {
        const data = await jdata.json();
        this.setState(state => ({
          ...state,
          profileData: {
            id: data.id,
            username: data.username,
            bio: data.bio,
            followings: data.followings,
            followers: data.followers,
            posts: data.followings,
            current: data.current,
            following: data.following,
            picture: data.picture
          },
          editingProfileData: {
            bio: data.bio
          }
        }));
      } else {
        console.log(await jdata.json());
      }
    },

    updateProfile: async (username) => {
      const url = this.state.url + "profile/";
      const bodyData = {
        bio: this.state.editingProfileData.bio
      };
      const jdata = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-access-token": this.state.fetched.currentUser.token
        },
        body: JSON.stringify(bodyData)
      });

      if (jdata.ok) {
        this.dataMethods.fetchProfile(username);
      } else {
        console.log("Failed");
      }
    },

    updateProfilePic: async (picture, setProfilePicc, username) => {
      const url = this.state.url + "profile/updatePic";
      const fileData = new FormData();
      fileData.append('profilePic', picture);
      const jdata = await fetch(url, {
        method: "POST",
        headers: {
          "x-access-token": this.state.fetched.currentUser.token
        },
        body: fileData
      })
      if(jdata.ok) {
        const data = await jdata.json();
        this.setState(state => ({
          ...state,
          fetched: {
            ...state.fetched,
            currentUser: {
              ...state.fetched.currentUser,
              picture: data.profilePic
            }
          }
        }))
        this.dataMethods.fetchProfile(username);
      }else {
        console.log("Failed");
      }
      setProfilePicc(null);
    },

    login: async e => {
      e.preventDefault();
      const url = this.state.url + "users/login";
      const bodyData = {
        username: this.state.login.username,
        password: this.state.login.password
      };
      const jdata = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(bodyData)
      });

      if (jdata.ok) {
        const data = await jdata.json();
        this.setState(state => ({
          ...state,
          isloggedIn: true,
          fetched: {
            ...state.fetched,
            currentUser: {
              username: data.username,
              token: data.token,
              picture: data.picture
            }
          }
        }));

        localStorage.setItem("login_jack", JSON.stringify(data));
        localStorage.setItem(
          "login_time_jack",
          JSON.stringify(new Date().getTime())
        );
        window.location.href = "/";
      } else {
        console.log("Failed to login");
      }
    },

    signup: async e => {
      e.preventDefault();
      const url = this.state.url + "users/register";
      const bodyData = {
        username: this.state.login.username,
        password: this.state.login.password
      };
      const jdata = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(bodyData)
      });

      if (jdata.ok) {
        window.location.href = "/";
      } else {
        console.log(await jdata);
      }
    },

    follow: async () => {
      const url = this.state.url + "profile/follow";
      const bodyData = { id: this.state.profileData.id };

      const jdata = await fetch(url, {
        method: "POST",
        headers: {
          "x-access-token": this.state.fetched.currentUser.token,
          "Content-Type": "application/json"
        },
        body: JSON.stringify(bodyData)
      })

      if(jdata.ok) {
        this.setState(state => ({
          ...state,
          profileData: {
            ...state.profileData,
            following: true
          }
        }))
      }else {
        console.log("Failed to follow");
      }
      
    },

    unfollow: async () => {
      const url = this.state.url + "profile/unfollow";
      const bodyData = { id: this.state.profileData.id };

      const jdata = await fetch(url, {
        method: "POST",
        headers: {
          "x-access-token": this.state.fetched.currentUser.token,
          "Content-Type": "application/json"
        },
        body: JSON.stringify(bodyData)
      })

      if(jdata.ok) {
        this.setState(state => ({
          ...state,
          profileData: {
            ...state.profileData,
            following: false
          }
        }))
      }else {
        console.log("Failed to unfollow");
      }
      
    },

    logout: async e => {
      e.preventDefault();
      localStorage.removeItem("login_jack");
      localStorage.removeItem("login_time_jack");
      this.setState({
        ...EmptyState
      });
      window.location.href = "/";
    },

    deleteUser: async e => {
      e.preventDefault();
      const url = this.state.url + "profile/" + this.state.profileData.id;
      const jdata = await fetch(url, {
        method: "delete",
        headers: {
          "x-access-token": this.state.fetched.currentUser.token
        }
      })

      if(jdata.ok) {
        this.dataMethods.logout(e);
      }else {
        console.log("Something went wrong");
      }
    },

    resetPass: async e => {
      e.preventDefault();
      const url = this.state.url + "profile/resetpass";
      if(this.state.settingsData.changePassword.main === this.state.settingsData.changePassword.confirmation) {
        const bodyData = { password: this.state.settingsData.changePassword.main };
        const jdata = await fetch(url, {
          method: "POST",
          headers: {
            "x-access-token": this.state.fetched.currentUser.token,
            "Content-Type": "application/json"
          },
          body: JSON.stringify(bodyData)
        })

        if(!jdata.ok) {
          console.log("Failed");
        }
      }
    }
  };

  render() {
    return (
      <MainContext.Provider
        value={{
          ...this.state,
          methods: this.change,
          dataMethods: this.dataMethods
        }}
      >
        {this.props.children}
      </MainContext.Provider>
    );
  }
}

const MainConsumer = MainContext.Consumer;

export { MainContext, MainProvider, MainConsumer };
