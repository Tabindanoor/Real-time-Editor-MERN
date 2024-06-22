// import React, { useEffect, useRef } from 'react';
// import { EditorView, basicSetup } from 'codemirror';
// import { EditorState } from '@codemirror/state';
// import { javascript } from '@codemirror/lang-javascript';

// const Editor = ({ value, onChange }) => {
//   const editorRef = useRef(null);
//   const editorViewRef = useRef(null);

//   useEffect(() => {
//     if (editorRef.current) {
//       const startState = EditorState.create({
//         doc: value,
//         extensions: [basicSetup, javascript(), EditorView.updateListener.of((v) => {
//           if (v.docChanged) {
//             onChange(v.state.doc.toString());
//           }
//         })],
//       });

//       editorViewRef.current = new EditorView({
//         state: startState,
//         parent: editorRef.current,
//       });
//     }

//     return () => {
//       if (editorViewRef.current) {
//         editorViewRef.current.destroy();
//       }
//     };
//   }, []);

//   useEffect(() => {
//     if (editorViewRef.current) {
//       const currentState = editorViewRef.current.state;
//       const transaction = currentState.update({
//         changes: { from: 0, to: currentState.doc.length, insert: value },
//       });
//       editorViewRef.current.dispatch(transaction);
//     }
//   }, [value]);

//   return <div ref={editorRef}></div>;
// };

// export default Editor;
import React, { useEffect, useRef } from 'react';
import { EditorView, basicSetup } from 'codemirror';
import { EditorState } from '@codemirror/state';
import { javascript } from '@codemirror/lang-javascript';
import { autocompletion } from '@codemirror/autocomplete';

const Editor = ({ value, onChange }) => {
  const editorRef = useRef(null);
  const editorViewRef = useRef(null);

  useEffect(() => {
    if (editorRef.current) {
      const startState = EditorState.create({
        doc: value,
        extensions: [
          basicSetup,
          javascript(),
          autocompletion(),
          EditorView.updateListener.of((v) => {
            if (v.docChanged) {
              onChange(v.state.doc.toString());
            }
          }),
        ],
      });

      editorViewRef.current = new EditorView({
        state: startState,
        parent: editorRef.current,
      });
    }

    return () => {
      if (editorViewRef.current) {
        editorViewRef.current.destroy();
      }
    };
  }, []);

  useEffect(() => {
    if (editorViewRef.current) {
      const currentState = editorViewRef.current.state;
      const transaction = currentState.update({
        changes: { from: 0, to: currentState.doc.length, insert: value },
        selection: { anchor: currentState.selection.main.head }, // Preserve the cursor position
      });
      editorViewRef.current.dispatch(transaction);
    }
  }, [value]);

  return <div ref={editorRef} ></div>;
  // hright and width controllled
//   style={{ height: '100vh', width: '100%' }}
};

export default Editor;
