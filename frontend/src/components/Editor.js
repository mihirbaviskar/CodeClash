import React from 'react';
import MonacoEditor from 'react-monaco-editor';

class Editor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      code: '#include<iostream>\nint main(){\nstd::cout<<"Hello World";\nreturn 0;\n}'
    };
  }

  editorDidMount(editor, monaco) {
    console.log('editorDidMount', editor);
    editor.focus();
  }

  onChange = (newValue, e) => {
    console.log('onChange', newValue, e);
    this.setState({ code: newValue });
  }

  handleSubmit = () => {
    console.log(this.state.code);
  }

  render() {
    const options = {
      selectOnLineNumbers: true,
      wordWrap: 'on'
    };
    return (
      <div>
        <MonacoEditor
          width="100%"
          height="100vh"
          language={this.props.language || "cpp"}
          theme={this.props.theme || "vs-dark"}
          value={this.state.code}
          options={options}
          onChange={this.onChange}
          editorDidMount={this.editorDidMount}
        />
        <button className="submit" onClick={this.handleSubmit}>Submit</button>
      </div>
    );
  }
}

export default Editor;
