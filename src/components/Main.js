import React, { Component } from 'react';
import {DETAILS} from '../shared/details';
import Tiles from './tiles'
import Header from  "./header"

import Carousel from '@brainhubeu/react-carousel';
import '@brainhubeu/react-carousel/lib/style.css';
import { NavbarBrand,Navbar, Nav, NavDropdown, Button, Media, } from "reactstrap";


class Main extends Component{
  constructor(props){
    super(props);
    this.state={  
      open: [false, false, false, false, false,false, false, false, false, false],
      games:[],
      tgp:[]
    }
    this.close=this.close.bind(this);
  }
  componentDidMount() {
    fetch('https://the-gaming-project-241406.firebaseio.com/games/tgpGames2.json')
    .then(res => res.json())
    .then(res => {
      let allGames = [
        'SGW2',
        'LOTF',
        'Extinction',
        'Away',
        'Splasher',
        'Grip',
        'BoilingBolt',
        'SGW3',
        'SteelRats',
        'TFITF',
        'Impulsion',
        'Outcast',
        'WRC4',
        'Tempest',
        'Pankapu',
        'DragoDino',
        'Anarcute',
        'Supertrucks',
        'Strikers',
      ]
      let games = [];let tgp=[];
      allGames.forEach(game => {
          games.push({appid: game, desc: res[game].desc, free: res[game].free, title: res[game].title})
      })
      games.forEach((game, index) => tgp.push({
        id: index,
        image: 'https://storage.googleapis.com/thegamingproject/games/' + game.appid + '/header.jpg',
        appid: game.appid,
        title: game.title,
        desc: game.desc,
        free: game.free,
        playable: false,
        overlay: true,
        videoBg: 'https://storage.googleapis.com/thegamingproject/games/' + game.appid + '/videoBg.mp4'
      }));
      this.setState({tgp});
    })
  }

  close=(id)=>{
    let newOpen = this.state.open;
    this.state.open.forEach((current, index) => {
      console.log(index, id);
      if (index != id) {
        newOpen[index] = false;
      } else {
        newOpen[index] = true;
      }
    })
    console.log(newOpen);
    this.setState({open: newOpen});
  }

  render() {
  
    var content = [];
    var initial=0;
      var end=initial+4; 
    this.state.tgp.forEach((game, i) =>{  
      i=i/4;
      if( i%1==0){
        content.push(
          
          <div className="row" key={game.id}>  
          
  
          <Tiles open={this.state.open} close={this.close} id={i} games={this.state.tgp.slice(initial,end)}/>
         
          </div>
          
        )
        initial+=4;
        end+=4;
      }
  });

    return (
        <div >
          {content}
      </div>
    );
  }
}



export default Main;
