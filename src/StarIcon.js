import './App.css';

const StarIcon=(props)=>{
    return (
        <i className="fas fa-star"
            style={{marginLeft: 20, color: props.starColor, cursor: 'pointer'}}/>
    );
}

export default StarIcon;
