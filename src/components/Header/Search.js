import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import queryString from 'query-string'
import axios from 'axios'
// import ListUser from '../ListUser'

class Search extends Component {
    state = {
        searchResult : [],
        total: 0
    }
    async componentDidMount() {
       this.fetchSearchResult()
    }
    componentDidUpdate (prevProps, prevState) {
        if(prevProps.location.search !== this.props.location.search) {
            this.fetchSearchResult()
        }
    }
    fetchSearchResult= async () => {
        const query = queryString.parse(this.props.location.search).q;
        // console.log(query)
        const res = await axios.get(`http://localhost:4000/users?q=${query}`);
        console.log(res)
        if (res.status === 200) {
            this.setState({
                searchResult: res.data,
                total : res.data.total
            });
        }
    }
    render() {
        return (
            <div>
                <h2>Search result for "{queryString.parse(this.props.location.search).q} " :</h2>
                <small>Total : {this.state.total} </small>
                {/* < ListUser listUsers = {this.state.searchResult} /> */}
            </div>
        )
    }
}
export default withRouter(Search)