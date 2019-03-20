import Banner from './Banner';
import React from 'react';

import agent from '../../agent';
import { connect } from 'react-redux';
import { CHANGE_TAB } from '../../constants/actionTypes';

import {
  HOME_PAGE_LOADED,
  HOME_PAGE_UNLOADED,
  APPLY_TAG_FILTER
} from '../../constants/actionTypes';


const mapStateToProps = state => ({
  ...state.home,
  appName: state.common.appName,
  token: state.common.token
});
const mapDispatchToProps = dispatch => ({
  onClickTag: (tag, pager, payload) =>
    dispatch({ type: APPLY_TAG_FILTER, tag, pager, payload }),
  onLoad: (tab, pager, payload) =>{
    dispatch({ type: CHANGE_TAB, tab, pager, payload }),
    dispatch({ type: HOME_PAGE_LOADED, tab, pager, payload })},
  onUnload: () =>
    dispatch({  type: HOME_PAGE_UNLOADED })


});

class Home extends React.Component {
  componentWillMount() {
    //agent.Articles.all();
    const tab = this.props.token ? 'feed' : 'all';
    const articlesPromise = this.props.token ? agent.Articles.feed :  agent.Articles.all;
    this.props.onLoad(tab, articlesPromise, Promise.all([agent.Tags.getAll(), articlesPromise()]));
    this.props.onLoad('all', agent.Articles.byAuthor("acnesiac"), agent.Articles.all());

  }
  componentWillUnmount() {
    this.props.onUnload();
  }
  render() {
    return (
      <div className="home-page">
        <div className="container page">
          <div className="row">
          </div>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
