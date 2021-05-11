import React from "react";
import { FormFieldComponentProps } from "../Root";
import styled from "styled-components";
import SunEditor, { SunEditorReactProps } from "suneditor-react";
import "suneditor/dist/css/suneditor.min.css"; // Import Sun Editor's CSS File
import { useAppSelector } from "../../../../hooks/useAppSelector";

const allPlugins = [
  ["undo", "redo"],
  ["font", "fontSize", "formatBlock"],
  ["paragraphStyle", "blockquote"],
  ["bold", "underline", "italic", "strike", "subscript", "superscript"],
  ["fontColor", "hiliteColor", "textStyle"],
  ["removeFormat"],
  "/",
  ["outdent", "indent"],
  ["align", "horizontalRule", "list", "lineHeight"],
  ["table", "link", "image"],
  ["showBlocks", "codeView"],
];

const MarkdownFieldRoot = styled.div`
  .sun-editor {
    border: solid 0.5px rgba(51, 51, 51, 0.2);
    border-radius: 10px;
    transition: all 0.3s ease-in-out;

    &:focus,
    :active,
    :focus-within,
    :visited {
      box-shadow: 0px 1px 10px rgba(17, 6, 173, 0.5);
    }
  }

  .se-btn-tray {
    padding-top: 10px;
    padding-left: 10px;
    padding-right: 10px;
    padding-bottom: 10px;
  }

  .se-toolbar {
    outline: none;
    border-radius: 10px;
    border-color: rgba(0, 0, 0, 0.1);
  }

  .se-resizing-bar {
    border: none;
    border-radius: 10px;
    border-color: rgba(0, 0, 0, 0.1);
  }

  .se-btn-tool-font {
    font-family: "Iceland";
  }

  .se-btn-tool-size {
    font-family: "Iceland";
  }

  .se-btn-tool-format {
    font-family: "Iceland";
  }
`;
const MarkdownFormField = (props) => {
  const { isUpdating, entrySelected } = useAppSelector(
    (state) => state.activeCollection
  );

  const { value, name, setFieldValue } = { ...props };

  const markdownRef = React.useRef(null);

  const handleMarkdownValueChange = (value) => {
    setFieldValue(name, value, true);


  };

  return (
    <div>
      <MarkdownFieldRoot>
        <SunEditor
          ref={markdownRef}
          setContents={isUpdating ? entrySelected.entryValues[name] : ""}
          onFocus={() => console.log("ass")}
          lang="pt_br"
          name={name}
          defaultValue={value}
          onChange={(e) => handleMarkdownValueChange(e)}
          setOptions={{
            height: "auto",
            minHeight: "200",
            buttonList: allPlugins,
            imageUrlInput: true,
            imageFileInput: false,
          }}
        />
      </MarkdownFieldRoot>
    </div>
  );
};

export default MarkdownFormField;
