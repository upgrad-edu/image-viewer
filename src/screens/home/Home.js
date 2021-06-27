import React, {Component} from 'react';
import './Home.css';
import Header from '../../common/header/Header';


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

