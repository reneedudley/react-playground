import React, { Component } from 'react';
import './App.css';

class StoryItem extends Component {
    handleClick=()=>{
        if(this.props.handleFavorite){
            this.props.handleFavorite(this.props.id)
        }
    };

    render() {
        const starColor = this.props.starColor || 'black';
        return (
            <div style={{borderBottom: '1px solid grey'}}>
                <p>{this.props.title}</p>
                <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                    <p>Author: {this.props.by}</p>
                    <div onClick={this.handleClick}>
                        <i className="fas fa-star"
                         style={{marginLeft: 20, color: starColor, cursor: 'pointer'}}/>
                    </div>
                </div>
            </div>
        );
    }
}

export default StoryItem;
