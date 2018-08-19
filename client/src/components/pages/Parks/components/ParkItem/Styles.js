const styles = {
  card: {
    height: 300,
    width: '100%',
    '&:hover': {
      cursor: 'pointer',
    }
  },
  content: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    height: 120,
    width: '100%',
    backgroundColor: 'rgba(0,0,0,0.6)',
    transition: 'bottom 0.5s',
  },
  typography: {
    color: 'white'
  }
}
export default styles;