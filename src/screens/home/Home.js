import React, {Component} from 'react';
import './Home.css';
import Header from '../../common/header/Header';

const styles =  theme => ({
    card: {
      maxWidth: 1100,
    },
    avatar: {
      margin: 10,
    },
    media: {
      height:0,
      paddingTop: '56.25%', // 16:9
    },
    formControl: {
      display:'flex',
      flexDirection:'row',
      justifyContent:'space-between',
      alignItems:'baseline',
    },
    comment:{
      display:'flex',
      alignItems:'center'
    },
    hr:{
      marginTop:'10px',
      borderTop:'2px solid #f2f2f2'
    },
    gridList:{
      width: 1100,
      height: 'auto',
      overflowY: 'auto',
    },
    grid:{
      display:'flex',
      justifyContent:'center',
      alignItems:'center',
      marginTop:90
    }
  });
class Home extends Component{

  constructor(props) {
    super(props);
    if (sessionStorage.getItem('access-token') == null) {
      props.history.replace('/');
    }
    this.state = {
      data: [],
      filteredData:[],
      userData:[],
      likeSet:new Set(),
      comments:{},
      currrentComment:"",
      userInfo:[],
      likes: 0
    }
  }

  componentDidMount(){
    this.getBaseUserInfo();
  }

  render(){
    const{classes} = this.props;
    return(
      <div>
        <Header
          userProfileUrl="profile.png"
          screen={"Home"}
          searchHandler={this.onSearchEntered}
          handleLogout={this.logout}
          handleAccount={this.navigateToAccount}/>
        <div className={classes.grid}>
          <GridList className={classes.gridList} cellHeight={'auto'}>
            {this.state.filteredData.map((item, index) => (
              <GridListTile key={item.id}>                
              </GridListTile>
            ))}
          </GridList>
        </div>
      </div>
    );
  }
}  

export default Home

