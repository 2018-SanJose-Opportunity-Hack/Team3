
const styles = {
  mainContainer: {
    width: '80%',
    margin: 'auto'
  },
  contentContainer:{
    padding: 10,
    backgroundColor: 'gray',
    marginTop: 20
  },
  tabContainer:{
    marginTop: 20
  },
  spinner: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)'
  },
  imageContainer: {
    position: 'relative',
    '&&.MuiGrid-item-121': {
      padding: '0 0 40px 0'
    },
    backgroundColor: 'white',
    borderRadius: '0 0 5px 5px',
    marginTop: 0
  },
  nameDiv: {
    position: 'absolute',
    zIndex: '100',
    width: 'calc(100% - 40px)',
    height: '60',
    top: 280,
    left: 20,
  },
  img: {
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    width: '100%',
    height: '300px'
  },
  title:{
    color: 'white',
    textAlign: 'center'
  }
}
export default styles;