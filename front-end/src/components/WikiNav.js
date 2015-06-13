/**
 * Created by lp1813 on 13/06/15.
 */
import React from 'react';
import WikiStore from '../stores/WikiPostStore';

export default class WikiNav extends React.Component {
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
                <div className="elem">
                    {post.title}
                </div>
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
