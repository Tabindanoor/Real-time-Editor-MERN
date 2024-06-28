import { useEffect, useRef } from 'react';
import Codemirror from 'codemirror';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/dracula.css';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/addon/edit/closetag';
import 'codemirror/addon/edit/closebrackets';
import PropTypes from 'prop-types';
import { Actions } from '../../Actions';

const Editor = ({ socketRef, roomId, onCodeChange }) => {
    console.log(onCodeChange,"code change")
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
            editorRef.current.setSize('100%', '100%');

            editorRef.current.on('change', (instance, changes) => {
                const { origin } = changes;
                const code = instance.getValue();


                onCodeChange(code)

                if (origin !== 'setValue') {
                    socketRef.current.emit(Actions.CODE_CHANGE, {
                        roomId,
                        code,
                    });
                }
            });
        }

        if (socketRef && socketRef.current) {
            init();
        }

        return () => {
            if (editorRef.current) {
                editorRef.current.toTextArea();
            }
        };
    }, [socketRef, roomId]);

    useEffect(() => {
        if (socketRef.current) {
            socketRef.current.on(Actions.CODE_CHANGE, ({ code }) => {
                if (editorRef.current && code !== editorRef.current.getValue()) {
                    editorRef.current.setValue(code);
                }
            });

            return () => {
                if (socketRef.current) {
                    socketRef.current.off(Actions.CODE_CHANGE);
                }
            };
        }
    }, [socketRef]);

    return <textarea id="realtimeEditor" className="flex-1 w-full h-[100%] resize-none direction-ltr"></textarea>;
};

Editor.propTypes = {
    socketRef: PropTypes.shape({
        current: PropTypes.object.isRequired
    }).isRequired,
    roomId: PropTypes.string.isRequired,
};

export default Editor;
