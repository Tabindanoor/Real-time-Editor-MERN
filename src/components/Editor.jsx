import React, { useRef, useEffect } from 'react';
import { EditorState, EditorView, basicSetup } from '@codemirror/basic-setup';
import { EditorView as EditorViewType } from '@codemirror/view';

const CodeMirrorEditor = () => {
  const editorRef = useRef<EditorViewType>();

  useEffect(() => {
    if (!editorRef.current) {
      editorRef.current = new EditorView({
        state: EditorState.create({
          extensions: basicSetup
        }),
        parent: document.getElementById('editor')!,
      });
    }

    return () => {
      editorRef.current?.destroy();
    };
  }, []);

  return <div id="editor" />;
};

export default CodeMirrorEditor;
