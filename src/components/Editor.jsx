import React, { useEffect, useRef } from 'react';
import Codemirror from 'codemirror';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/dracula.css';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/addon/edit/closetag';
import 'codemirror/addon/edit/closebrackets';
import PropTypes from 'prop-types'
import { Actions } from '../../Actions';

const Editor = ({ socketRef, roomId }) => {
    const editorRef = useRef(null);
    useEffect(() => {
        async function init() {
            editorRef.current = Codemirror.fromTextArea(
                document.getElementById('realtimeEditor'),
                {
                    mode: { name: 'javascript', json: true },
                    theme: 'dracula',
                    autoCloseTags: true,
                    autoCloseBrackets: true,
                    lineNumbers: true,
                }
            );

            editorRef.current.on('change', (instance, changes) => {
                const { origin } = changes;
                const code = instance.getValue();
                // onCodeChange(code);
                if (origin !== 'setValue') {
                    socketRef.current.emit(Actions.CODE_CHANGE, {
                        roomId,
                        code,
                    });
                }
            });
        }

        console.log(socketRef && socketRef.current,roomId,"sockt + rommid")

        init();
    }, []);

    useEffect(() => {
        if (socketRef.current !==null) {
           socketRef.current.on(Actions.CODE_CHANGE, ({ code }) => {
                if (code !== null) {
                    editorRef.current.setValue(code);
                }
            });
        }

        return () => {
            socketRef.current.off(Actions.CODE_CHANGE);
        };
    }, [socketRef.current]);

    return <textarea id="realtimeEditor"></textarea>;
};

 Editor.propTypes = {
    socketRef: PropTypes.shape({
      current: PropTypes.object.isRequired
    }).isRequired
  };


export default Editor;




// import CodeMirror from 'codemirror';
// import 'codemirror/lib/codemirror.css';
// import 'codemirror/mode/javascript/javascript';
// import 'codemirror/addon/edit/closebrackets';
// import 'codemirror/addon/edit/closetag';
// import 'codemirror/addon/edit/matchbrackets';
// import 'codemirror/addon/edit/matchtags';
// import 'codemirror/addon/edit/continuelist';
// import 'codemirror/addon/edit/matchtags';
// import 'codemirror/theme/dracula.css';
// import 'codemirror/addon/hint/show-hint'
// import 'codemirror/addon/hint/javascript-hint'
// import PropTypes from 'prop-types'
// import 'codemirror/addon/hint/anyword-hint'
// import { useEffect, useRef } from 'react';
// import { Actions } from '../../Actions';



// const Editor = ({socketRef, roomId}) => {
//   const editorRef = useRef(null);




//   useEffect(() => {


//     const editor = CodeMirror.fromTextArea(editorRef.current, {
//       mode: { name: 'javascript', json: true },
//       theme: 'dracula',
//       lineNumbers: true,
//       autoCloseBrackets: true,
//       autoCloseTags: true,
//       matchBrackets:true,
//       matchTags:true,
//       showHint:true,
      
//     });


//     // Ensure the editor has proper width
//     editor.setSize('100%', '100%');
//     // console.log(editor,"editor")
//     console.log(editor,"editoref")

//     console.log(socketRef,"socketref")
    
//     editor.on('change', (instance, changes) => {

//       console.log("change made")
//       console.log(instance,changes)
//       const {origin } = changes;
//       console.log(origin,"o")
//       const code = instance.getValue()

//       if(origin !== 'setValue'){

//         socketRef.current.emit(Actions.CODE_CHANGE, ()=>{
//           roomId,
//           code
          
//         })
//         console.log(code,"code")


//       }

      

      
//       });



   



//     return () => {
//       editor.toTextArea();
//     };
//   }, []);

//   useEffect(() => {
//     if(socketRef.current)
//     {socketRef.current && socketRef.current.on(Actions.CODE_CHANGE,({code})=>{
//       if(code!==null){
//         editorRef.setValue(code)
//       }
//     })}
    
   
//   }, [socketRef.current])
  

 

//   return (
//     <div style={{ height: '100%', width: '100%' }}>
//       <textarea id="realtimeEditor" ref={editorRef} className="h-96 w-full"></textarea>
//      </div>
//   );
// };

// Editor.propTypes = {
//   socketRef: PropTypes.shape({
//     current: PropTypes.object.isRequired
//   }).isRequired
// };

// export default Editor;






    // const init=async()=>{
    //     editorRef.current = CodeMirror.fromTextArea(document.getElementById("realtimeEditor"),{
    //       mode: {name:"javascript", json:true},
    //       theme: "dracula",
    //       lineNumbers: true,
    //       lineWrapping: true,
    //       autoCloseTags: true,
    //       autoCloseBrackets: true,

    //     })
    // }





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
