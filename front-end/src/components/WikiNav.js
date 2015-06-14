/**
 * Created by lp1813 on 13/06/15.
 */
import React from 'react';
import WikiStore from '../stores/WikiPostStore';
import RouterContainer from '../utils/RouterContainer';
var Link = require('react-router').Link;

export default class WikiNav extends React.Component {

    onClick (postid) {
        RouterContainer.get().transitionTo('wiki-view', {wikiid: postid});
    }

    constructor () {
        this.state = {
            posts: []
        };
    }
    componentDidMount () {
        WikiStore.addChangeListener(this._onChange.bind(this));
    }
    componentWillUnmount () {
        WikiStore.removeChangeListener(this._onChange.bind(this));
    }
    _onChange () {
        var posts = WikiStore.getAll();
        this.setState({
            posts: posts
        });
    }

    render () {
        const getElem = (post) => {
            return (
                <Link to="wiki-view" params={{wikiid: post.id}} className="wiki-side-link">
                    <div className="elem">
                        {post.title}
                    </div>
                </Link>
            );
        };

        return (
            <div>
                <div id="nav-hint">
                    RECENT POSTS
                </div>
                <div className="title-list">
                    {this.state.posts.map(getElem)}
                </div>
            </div>
        );
    }
}

