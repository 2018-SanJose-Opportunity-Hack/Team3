import React, {Component} from 'react';
import Modal from '@material-ui/core/Modal';
import Wrapper from '../hoc/Wrapper';
import './Style.css';
class ImgContainer extends Component{
  state= {
    open: false
  }

  handleClose = ()=>{
    this.setState({open: false});
  }
  handleOpen = () => {
    this.setState({open: true});
  }
  render(){
    return (
      <Wrapper>
        <Modal
          open = {this.state.open}
          onClose = {this.handleClose}
          style = {{width: '80vw', margin: 'auto'}}
          
        >
          <img style = {
            {
              width: '100%',
              maxHeight: '95vh',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              position: 'absolute',
              margin: 'auto',
              ...this.props.imgModalStyles,
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)'
            }
            
          }
          onClick = {this.handleClose}
            className = 'modal'
          src = {this.props.src}
          />
        </Modal>
        <img 
          style = {{
            width: '100%', 
            backgroundImage: `url(${this.props.src})`,
            ...this.props.imgStyles
          }} 
          onClick = {this.handleOpen}
          className='imgModal'/>
      </Wrapper>
    );
  }
}
export default ImgContainer;