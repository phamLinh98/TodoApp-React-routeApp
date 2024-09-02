import {
  ContentState,
  EditorState,
  convertFromHTML,
  convertToRaw,
} from "draft-js";
import draftToHtml from "draftjs-to-html";
import _ from "lodash";
import { useCallback, useEffect, useRef, useState } from "react";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

const NoteEditor = ({
  initialContent,
  onChangeContent,
  debounceTime = 300,
}) => {
  const debouncedUpdateContent = useRef(
    _.debounce((content) => {
      onChangeContent(content);
    }, debounceTime)
  ).current;

  const handleChangeContent = useCallback(
    (content) => {
      debouncedUpdateContent(content);
    },
    [debouncedUpdateContent]
  );

  return (
    <NoteEditorCore
      initialContent={initialContent}
      onChangeContent={handleChangeContent}
    />
  );
};

const NoteEditorCore = ({
  initialContent = "<p>Initial Note content...</p>",
  onChangeContent = () => {},
}) => {
  const [editorState, setEditorState] = useState(() => {
    return EditorState.createEmpty();
  });

  const [rawHTML, setRawHTML] = useState(initialContent);

  useEffect(() => {
    const blocksFromHTML = convertFromHTML(initialContent);
    const state = ContentState.createFromBlockArray(
      blocksFromHTML.contentBlocks,
      blocksFromHTML.entityMap
    );
    setEditorState(EditorState.createWithContent(state));
  }, [initialContent]);

  useEffect(() => {
    onChangeContent(rawHTML);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rawHTML]);

  if (!editorState) {
    return null;
  }

  const handleOnChange = (e) => {
    setEditorState(e);
    setRawHTML(draftToHtml(convertToRaw(e.getCurrentContent())));
  };

  return (
    <div className="editor max-w-[70vw] h-full">
      <Editor
        editorState={editorState}
        toolbarClassName="toolbarClassName"
        wrapperClassName="wrapperClassName"
        editorClassName="editorClassName"
        onEditorStateChange={handleOnChange}
      />
    </div>
  );
};

export default NoteEditor;
