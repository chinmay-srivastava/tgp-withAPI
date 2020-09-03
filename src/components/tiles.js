import React, {Component,useState} from 'react';
import {Alert,Card,CardImg,CardImgOverlay,CardText,CardBody,CardTitle,Button, Collapse,Row,Col,Container,Media,} from 'reactstrap';
import { Link } from 'react-router-dom';
import Carousel from "react-elastic-carousel";
import '../App.css'
import {DETAILS}  from '../shared/details'
import {withGetScreen} from 'react-getscreen'
import OutsideClickHandler from 'react-outsideclickhandler';
import image from "../assets/placehold.jpeg"
import GridLayout from 'react-grid-layout';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoffee, faHome, faCross, faTimes, faTimesCircle } from '@fortawesome/free-solid-svg-icons'
import ReactPlayer from 'react-player'



class Menu extends Component{
  constructor(props){
    super(props);
    this.state = {
      selectedTile:null,
      
      games:[],
      tgp:[]
      
      // open:false
    }
    // this.close=this.close.bind(this);
  }

  onTileSelect(game){
    this.setState({selectedTile:game});
    this.props.close(this.props.id)
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
          games.push({appid: game,image:' ', desc: res[game].desc, free: res[game].free, title: res[game].title,playable:false,overlay:true,videoBg:' '})
      })
      games.forEach((game, index) => games.push({
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
      
      this.setState({games});
    })
  }


  renderTile = (game) => {
    if(game!=null){
      if (this.props.isMobile()||this.props.isTablet() ){
        return(
          <div >
            <Alert color="danger" isOpen={this.props.open[this.props.id]}>
              Download <a href="#" className="alert-link">The Gaming Project App</a> to play on your smartphones.
            </Alert>
          </div>
        );
      } else {
        return(
          <Collapse isOpen={this.props.open[this.props.id]}>
            <Card className="ml-5" >
            
              <div className="mb-2">
              <CardImgOverlay>
                <FontAwesomeIcon icon={faTimesCircle} size="50%" onClick={() => this.props.close()}/>
                </CardImgOverlay>
                <video src={game.videoBg} autoPlay/>
                
                <CardBody>
                  <CardTitle className="font-weight-bolder">{game.title}</CardTitle>
                  <CardText >{game.desc}</CardText>
                </CardBody>
              </div>
              
            </Card>
          </Collapse> 
        );
      }
    }
    else{
      return(
        <div></div>
      );
    }
  }

  render() {
  
   
    const breakPoints = [
      { width: 1, itemsToShow: 5 },
      { width: 550, itemsToShow: 1 },
      { width: 768, itemsToShow: 4 },
      { width: 1200, itemsToShow: 4},
    ];

    
    const menu = this.props.games.map(game=> {
     
      if (this.props.isMobile()){
        return (
          <Col className="col-12 center" style={{marginBottom:"20px"}}>
            {/* <div  onClick={() => this.props.close()}> */}
              <Card key={game.id} onClick={() => this.onTileSelect(game)}>
                <img src={game.image} width="100%"/>
                <CardImgOverlay>
                  <CardTitle className="font-weight-bolder">{game.title}</CardTitle>
                </CardImgOverlay>
              </Card>
           
          </Col>
        );
      } else if (this.props.isTablet()){
        return ( 
          <Row>
            {/* <div  onClick={() => this.props.close()}> */}
              <Card key={game.id} onClick={() => this.onTileSelect(game)}>
                <CardImg src={game.image}/>
                <CardImgOverlay>
                  <CardTitle className="font-weight-bolder">{game.title}</CardTitle>
                </CardImgOverlay>
              </Card>
            {/* </div> */}
          </Row>
        );
      } else {
        return (  
          <Col className="col-12 center" >
          
            <div>  
              <Col className="col-12 center" >
                <div key={game.id} onClick={() => this.onTileSelect(game)} className="mb-1 mt-1">
                  
                    <CardImg src={game.image} width="100" onClick={() => this.props.close()} className="p-0"/>
                    <CardImgOverlay>
                      <CardTitle className="font-weight-bolder">{game.title}</CardTitle>
                    </CardImgOverlay>
                  
                </div>
              </Col>
              
            </div>
          </Col>
        );
      }
    });
    if (this.props.isMobile()||this.props.isTablet() ){
      return(
        <div className="row">
          <Container className="container-fluid">
            {this.renderTile(this.state.selectedTile)}
            <Row>
              {menu}
            </Row>
          </Container>
        </div>
      );
    } else {
      return(
        
        <div className="row container">
        
      
            
            <Carousel breakPoints={breakPoints}  renderPagination={({ pages, activePage, onClick }) => {
              return (
                <div> </div>
              )
            }} >
              {menu} 
               </Carousel> 
          
          
            <div  className="col-12 center">
            {this.renderTile(this.state.selectedTile)}
          </div>  
          
         
        </div>
       
      );
    }
  }
}

export default withGetScreen(Menu);