const styles = {
  root: {
    margin: 'auto',
    marginTop: 40,
    width: '100%'
  },
  paper: {
    width: 500,
    margin: 'auto',
    paddingTop: 40,
    paddingLeft: 60,
    paddingRight: 60,
    paddingBottom: 100,
    backgroundColor: '#003351',
    clipPath: 'polygon(0 0, 100% 0, 95% 85%, 50% 100%, 5% 85%)'
  },
  formControl: {
    width: '100%',
    marginBottom: 40
  },
  formInput: {
    backgroundColor: '#00507f',
    borderRadius: '5px',
    color: 'white',
    marginLeft: '-10px',
    marginRight: '-10px',
    '&&&&:hover::before': {
      borderBottom: '2px solid #cccccc'
    },
    height: '40px',
    fontSize: '20px',
    paddingLeft: '10px'
  },
  formLabel: {
    color: '#cccccc',
    zIndex: 200,
    fontSize: '20px'
  },
  button: {
    width: '100%',
    backgroundColor: '#0080cc',
    '&:hover': {
      backgroundColor: '#0167a3'
    },
    height: '40px',
    fontSize: '1.2em'
  },
  title: {
    color: 'white',
    marginBottom: 20,
    textAlign: 'center',
    fontSize: '2rem'
  },
  formHelper: {
    color: 'white',
    fontSize: '0.8rem'
  }
};
export default styles;