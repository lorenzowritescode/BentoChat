'use strict';

var React = require('react/addons'),
    WikiActions = require('../actions/WikiAction'),
    Link = require('react-router').Link;


require('styles/WikiEditor.sass');

var tabList = [
    { 'id': 1, 'name': 'Edit', 'url': '/edit' },
    { 'id': 2, 'name': 'Preview', 'url': '/preview' }
];

var Editor = React.createClass({

    getInitialState: function () {
        return (
        {title: '',
            text: ''}
        );
    },

    onTitleChange: function (event, value) {
        this.setState({title: event.target.value});
        this.props.titleChange(event.target.value);
    },

    onChange: function (event, value) {
        this.setState({text: event.target.value});
        this.props.textChange(event.target.value);
    },

    render: function () {
        return (
            <section className="wiki-edit-text">
                <textarea
                    className="titlebox"
                    placeholder="Title"
                    rows="1"
                    onChange={this.onTitleChange}
                    value={this.state.title}
                    />
                <textarea
                    className="inputbox"
                    onChange={this.onChange}
                    value={this.state.text}
                    />
            </section>
        );
    }
});

var Tab = React.createClass({
    _onClick: function(event){
        event.preventDefault();
        this.props.handleClick();
    },

    render: function(){
        return (
            <li className={this.props.isCurrent ? 'current' : null}>
                <a onClick={this._onClick} href={this.props.url}>
                    {this.props.name}
                </a>
            </li>
        );
    }
});

var Tabs = React.createClass({
    _onClick: function(tab){
        this.props.changeTab(tab);
    },

    render: function(){
        return (
            <nav>
                <ul>
                    {this.props.tabList.map(function(tab) {
                        return (
                            <Tab
                                handleClick={this._onClick.bind(this, tab)}
                                key={tab.id}
                                url={tab.url}
                                name={tab.name}
                                isCurrent={(this.props.currentTab === tab.id)}
                                />
                        );
                    }.bind(this))}
                </ul>
            </nav>
        );
    }
});

var TabContent = React.createClass({
    render: function() {
        return (
            <div className="tabContent">
                {this.props.currentTab === 1 ?
                    <div className="wiki-edit">
                        <Editor textChange={this.props.textChange}
                                titleChange={this.props.titleChange}
                                />
                    </div>
                    : null}

                {this.props.currentTab === 2 ?
                    <div className="wiki-preview">
                        preview!
                    </div>
                    : null}
            </div>
        );
    }
});

var WikiEditor = React.createClass({

    getInitialState: function () {
        return (
        {text: '',
        title: '',
        preview: '',
        tabList: tabList,
        currentTab: 1}
        );
    },

    changeTab: function(tab) {
        this.setState({currentTab: tab.id});
    },

    render: function () {
        return (
            <div className="full-size">
                <Tabs
                    className="tabs"
                    currentTab={this.state.currentTab}
                    tabList={this.state.tabList}
                    changeTab={this.changeTab}
                    />
                <TabContent className="Content"
                            textChange={this._onChange}
                            titleChange={this._onTitleChange}
                            currentTab={this.state.currentTab}/>
            </div>
        );
    },

    _onTitleChange: function (title) {
        this.setState({title: title});
    },

    _onChange: function (text) {
        this.setState({text: text});
    },


//<header className="button-drawer" onClick={this.send}>
//    <Link to="wiki" className="btn btn-success save-wiki">
//        <span className="glyphicon glyphicon-ok"></span> Save
//    </Link>
//</header>
//<section className="wiki-edit-text">
//    <div><h3>Edit</h3></div>
//    <textarea
//className="titlebox"
//placeholder="Title"
//rows="1"
//onChange={this._onTitleChange}
//value={this.state.title}
///>
//<textarea
//    className="inputbox"
//    onChange={this._onChange}
//    value={this.state.text}
//    />
//</section>
//<div className="wiki-edit-preview">
//    <div><h3>Preview</h3></div>
//    <textarea readOnly value={this.state.preview} />
//</div>

    send: function () {
        var text = this.state.text.trim();
        var title = this.state.title.trim();
        if (text) {
            WikiActions.createPost(title, text);
        }
    }
});

module.exports = WikiEditor;
