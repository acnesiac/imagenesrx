import VentaList from '../VentaList';
import React from 'react';
import {connect} from 'react-redux';

const mapStateToProps = state => ({
    ...state.articleList,
    token: state.common.token
});
const mapDispatchToProps = dispatch => ({});
const MainView = props => {
    return (
        <div>
            <VentaList
                token={props.token}
                pager={props.pager}
                lista={props.ventas}
                loading={props.loading}
                articlesCount={props.articlesCount}
                currentPage={props.currentPage}/>
        </div>
    );
};
export default connect(mapStateToProps, mapDispatchToProps)(MainView);
