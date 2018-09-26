import { EditorState } from 'draft-js';
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
        textAlign: 'left',
    }
};

class TextEditor extends Component {
    constructor(props) {
        super(props);

        this.state = {
            editorState: EditorState.createEmpty(),
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
                    console.log(this.state.editorState.getCurrentContent().getPlainText());
                }}>Show me text</button>
            </div>
        );
    }
}

export { TextEditor };