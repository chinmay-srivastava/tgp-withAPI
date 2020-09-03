import React, {Component,useState} from 'react';
import {Alert,Card,CardImg,CardImgOverlay,CardText,CardBody,CardTitle, Button, Collapse,Row,Col,Container } from 'reactstrap';
import { Link } from 'react-router-dom';
import Carousel from "react-elastic-carousel";
import {withGetScreen} from 'react-getscreen'
import image from "../assets/placehold.jpeg"
import GridLayout from 'react-grid-layout';

class Menu2 extends Component{
  

  constructor(props){
      super(props);
      this.state = {
        selectedTile:null,
         open:false
          }
          this.close=this.close.bind(this);
  }

onTileSelect(detail){
  this.setState({selectedTile:detail,
 
  });
  

}

close(){
  this.setState({
    open:!this.state.open
  });
}

renderTile(detail){
  
  if(detail!=null ){
    if (this.props.isMobile()||this.props.isTablet() ){
      return(
        <div >
        <Alert color="danger" isOpen={this.state.open}>
          Download <a href="#" className="alert-link">The Gaming Project App</a> to play on your smartphones.
        </Alert>
        </div>
      );
    }
    else{
    return(
    
    
    <Collapse isOpen={this.state.open}>
    <Card >
    <div>
    <Button onClick={this.close}>X</Button>
        
      <CardImg top src={image} alt={detail.name} width="100%" />
      <CardBody>
        <CardTitle className="font-weight-bolder">{detail.name}</CardTitle>
        <CardText >{detail.description}</CardText>
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
   

    const menu = this.props.details.map((detail,i)=> {
     
      if (this.props.isMobile()){
        return (    
        
          <Col className="col-12 center" style={{marginBottom:"20px"}}>
          <div  onClick={this.close}>
        <Card key={detail.id} onClick={() => this.onTileSelect(detail)}>
          <CardImg src={image}/>
          <CardImgOverlay>
            <CardTitle className="font-weight-bolder">{detail.name}</CardTitle>
          </CardImgOverlay>
        </Card>
   
        </div>
        </Col>
      
                
        );
      }

      else if (this.props.isTablet()){
        return (  
        
          
          <Row>
          <div  onClick={this.close}>
        <Card key={detail.id} onClick={() => this.onTileSelect(detail)}>
          <CardImg src={image}/>
          <CardImgOverlay>
            <CardTitle className="font-weight-bolder">{detail.name}</CardTitle>
          </CardImgOverlay>
        </Card>
   
        </div>
        </Row>
        
                
        );
      }

else{
  
    if (i>=4&&i<8){
      return (  
        <Col className="col-3 center" style={{marginBottom:"20px"}}>
        <div>
        <Col className="col-12 center" style={{marginBottom:"20px"}}>
          <Card key={detail.id} onClick={() => this.onTileSelect(detail)}>
          <Card  onClick={this.close}>
        
          <CardImg src={image}/>
          <CardImgOverlay>
            <CardTitle className="font-weight-bolder">{detail.name}</CardTitle>
          </CardImgOverlay>
        
          </Card> 
        
        </Card>
        </Col>
    </div>
    </Col>
      );
      }
      
      
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
    }
       else{
          return(
          
          <div className="row">
      <Container className="container-fluid">

        <Row>
        {menu}
        </Row>
        {this.renderTile(this.state.selectedTile)}
        
          </Container>
      </div>
            );
      }
      }
    }
  

      export default withGetScreen(Menu2);