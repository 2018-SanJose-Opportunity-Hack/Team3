const styles = {
  root: {
    width: '100%',
    margin: 'auto'
  },
  gridItem: {
    '&&&': {
      padding: 0
    }
  },
  paper: {
    width: '100%',
    height: 'calc(100vh - 65px)',
    maxWidth: '300px',
    minHeight: '250px',
    backgroundColor: '#00324f',
  },
  listItemActive:{
    backgroundColor: '#006dad',
    '&:hover': {
      backgroundColor: '#005384'
    }
  },
  listText: {
      color: 'white'
  },
  list: {
    paddingTop: 0
  }
}
export default styles;