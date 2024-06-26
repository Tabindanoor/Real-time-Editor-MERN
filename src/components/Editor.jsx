import React, { useEffect, useRef } from "react";
import "codemirror/mode/javascript/javascript";
import "codemirror/theme/dracula.css";
import "codemirror/addon/edit/closetag";
import "codemirror/addon/edit/closebrackets";
import "codemirror/lib/codemirror.css";
import CodeMirror from "codemirror";

function Editor({ socketRef, roomId, onCodeChange }) {
  const editorRef = useRef(null);
  useEffect(() => {
    const init = async () => {
      const editor = CodeMirror.fromTextArea(
        document.getElementById("realtimeEditor"),
        {
          mode: { name: "javascript", json: true },
          theme: "dracula",
          autoCloseTags: true,
          autoCloseBrackets: true,

          
        }
      );
      // for sync the code
      editorRef.current = editor;

    
      
    };

    init();
  }, []);

  // data receive from server
  

  return (
    <div style={{ height: "600px" }}>
      <textarea id="realtimeEditor"></textarea>
    </div>
  );
}

export default Editor;



// import  { useEffect, useRef } from "react";
// import "codemirror/mode/javascript/javascript";
// import "codemirror/theme/dracula.css";
// import "codemirror/addon/edit/closetag";
// import "codemirror/addon/edit/closebrackets";
// import "codemirror/lib/codemirror.css";
// import CodeMirror from "codemirror";

// function Editor() {
//   const editorRef = useRef(null);
//   useEffect(() => {
//     const init = async () => {
//       const editor = CodeMirror.fromTextArea(
//         document.getElementById("realtimeEditor"),
//         {
//           mode: { name: "javascript", json: true },
//           theme: "dracula",
//           autoCloseTags: true,
//           autoCloseBrackets: true,
//           lineNumbers: true,
//         }
//       );
//       // for sync the code
//       editorRef.current = editor;

//       editor.setSize(null, "100%");
//     }
        

//     init();
//   }, []);

//   // data receive from server


//   return (
//     <div style={{ height: "600px" }}>
//       <textarea id="realtimeEditor"></textarea>
//     </div>
//   );
// }

// export default Editor;











// import { useEffect, useRef } from 'react';
// import { EditorView, basicSetup } from 'codemirror';
// import { EditorState } from '@codemirror/state';
// import { javascript } from '@codemirror/lang-javascript';
// import { autocompletion } from '@codemirror/autocomplete';


// const Editor = ({ value, onChange }) => {
//   const editorRef = useRef(null);
//   const editorViewRef = useRef(null);

//   useEffect(() => { 
//     if (editorRef.current) {
//       const startState = EditorState.create({
//         doc: value,
//         extensions: [
//           basicSetup,
//           javascript(),
//           autocompletion(),
//           EditorView.updateListener.of((v) => {
//             if (v.docChanged) {
//               onChange(v.state.doc.toString());
//             }
//           }),
//         ],
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
//         selection: { anchor: currentState.selection.main.head }, // Preserve the cursor position
//       });
//       editorViewRef.current.dispatch(transaction);
//     }
//   }, [value]);

//   return <div ref={editorRef}  className='overflow-hidden relative  '></div>;
  
// };

// export default Editor;
