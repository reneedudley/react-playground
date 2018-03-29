import React, { Component } from 'react';
import StoryItem from './StoryItem';
import './App.css';

class App extends Component {
 state = {
     user: null,
     isLoaded: false,
     stories: [],
     favorites: []
 };

 componentDidMount() {
     const that = this;
     fetch(`https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty`)
         .then(res => res.json())
         .then(
             (data) => {
                 data.slice(0,50).forEach(id => {
                     fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json?print=pretty`).then((res) => {
                         res.json().then((story) => {
                             const stories = [...this.state.stories, story];
                             this.setState({stories, isLoaded: true})
                         });
                     });
                 })
             },
             // Note: it's important to handle errors here
             // instead of a catch() block so that we don't swallow
             // exceptions from actual bugs in components.
             (error) => {
                 that.setState({
                     isLoaded: true,
                     error
                 });
             }
    )
 }

 handleFavorite=(id)=>{
     const storyObj = this.state.stories.find(item =>{
         return item.id == id;
     });
     const newFavorites = this.state.favorites;
     newFavorites.push(storyObj);
     this.setState({favorites: newFavorites})
 };

 renderStories(){
     if(this.state.stories){
         return this.state.stories.map((story, key) =>{
             return <StoryItem handleFavorite={this.handleFavorite} key={key} title={story.title} by={story.by} id={story.id}/>
         })
     }
 }

 handleUnfavorite=(id)=>{
     const newFavorites = this.state.favorites.filter(item => {
         return item.id !== id;
     });
     this.setState({favorites: newFavorites})
 };

 renderFavorites(){
     if(this.state.favorites){
         return this.state.favorites.map((story, key) =>{
             return <StoryItem handleFavorite={this.handleUnfavorite} starColor='#ecce25' key={key} title={story.title} by={story.by} id={story.id}/>
         })
     }
 }



 render() {
    if(!this.state.isLoaded){
        return <h5>Loading be patient</h5>
    }

    return (
      <div className="App" style={{display: 'flex'}}>
          <div className="stories">
              <h5>Stories</h5>
              {this.renderStories()}
          </div>
          <div className="favorites" style={{marginLeft: 50, border: '2px solid grey', width: '60%'}}>
              <h5>favorites</h5>
              {this.renderFavorites()}
          </div>
      </div>
    );
  }

}

export default App;
