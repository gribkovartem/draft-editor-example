import { convertFromRaw, convertToRaw, EditorState } from 'draft-js';
import createInlineToolbarPlugin from 'draft-js-inline-toolbar-plugin';
import 'draft-js-inline-toolbar-plugin/lib/plugin.css';
import createMentionPlugin, { defaultSuggestionsFilter } from 'draft-js-mention-plugin';
import 'draft-js-mention-plugin/lib/plugin.css';
import Editor from 'draft-js-plugins-editor';
import React, { Component } from 'react';
import { mentions } from './mentions';

const styles = {
    editor: {
        minHeight: '140px',
        boxSizing: 'border-box',
        border: '1px solid #ddd',
        cursor: 'text',
        padding: '16px',
        borderRadius: '2px',
        marginBottom: '2em',
        boxShadow: 'inset 0px 1px 8px -3px #ABABAB',
        background: '#fefefe',
        textAlign: 'left'
    }
};

const editorContentText = '{"blocks":[{"key":"fe404","text":"Max Stoiber FYI","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[{"offset":0,"length":11,"key":0}],"data":{}},{"key":"69tr0","text":"","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"3qsra","text":"This is presentation of bold text.","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":0,"length":34,"style":"BOLD"}],"entityRanges":[],"data":{}},{"key":"ac3lf","text":"This is presentation of italic text.","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":0,"length":36,"style":"ITALIC"}],"entityRanges":[],"data":{}},{"key":"4cio5","text":"This is presentation of underlined text.","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":0,"length":40,"style":"UNDERLINE"}],"entityRanges":[],"data":{}},{"key":"499m5","text":"","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"l655","text":"And this text is also preloaded","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{"0":{"type":"mention","mutability":"SEGMENTED","data":{"mention":{"name":"Max Stoiber","link":"https://twitter.com/mxstbr","avatar":"https://pbs.twimg.com/profile_images/763033229993574400/6frGyDyA_400x400.jpg"}}}}}';

class TextEditor extends Component {
    constructor(props) {
        super(props);

        this.state = {
            editorState: EditorState.createWithContent(convertFromRaw(JSON.parse(editorContentText))),
            suggestions: mentions,
        };
        this.inlineToolbarPlugin = createInlineToolbarPlugin();
        this.mentionPlugin = createMentionPlugin();
    }

    onChange = (editorState) => {
        this.setState({
            editorState,
        });
    };

    onSearchChange = ({ value }) => {
        this.setState({
            suggestions: defaultSuggestionsFilter(value, mentions),
        });
    };

    onAddMention = (mention) => {
        console.log(mention.name);
    };

    render() {
        const { MentionSuggestions } = this.mentionPlugin;
        const { InlineToolbar } = this.inlineToolbarPlugin;
        const plugins = [this.mentionPlugin, this.inlineToolbarPlugin];

        return (
            <div>
                <div onClick={() => this.editor.focus()} style={styles.editor}>
                    <Editor
                        editorState={this.state.editorState}
                        onChange={this.onChange}
                        plugins={plugins}
                        ref={element => {this.editor = element}}
                    />
                    <InlineToolbar />
                    <MentionSuggestions
                        onSearchChange={this.onSearchChange}
                        suggestions={this.state.suggestions}
                        onAddMention={this.onAddMention}
                    />
                </div>
                <button onClick={() => {
                    console.log(convertToRaw(this.state.editorState.getCurrentContent()));
                }}>Save</button>
            </div>
        );
    }
}

export { TextEditor };
