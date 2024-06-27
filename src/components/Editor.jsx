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










