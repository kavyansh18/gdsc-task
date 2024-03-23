import React, { useState } from 'react';

const App = () => {
  const [text, setText] = useState('');
  const [selectionStart, setSelectionStart] = useState(0);
  const [selectionEnd, setSelectionEnd] = useState(0);
  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);
  const [isHeading, setIsHeading] = useState(false);

  const handleBoldClick = () => {
    if (selectionStart === selectionEnd) return; // No text selected

    const selectedText = text.substring(selectionStart, selectionEnd);
    let newText;

    if (isBold && selectedText.startsWith('**') && selectedText.endsWith('**')) {
      // If selected text is already bold, remove the bold syntax
      newText = text.substring(0, selectionStart) + selectedText.slice(2, -2) + text.substring(selectionEnd);
    } else {
      // Otherwise, add bold syntax
      newText = text.substring(0, selectionStart) + '**' + selectedText + '**' + text.substring(selectionEnd);
    }

    setText(newText);
    setIsBold(!isBold);

    // Adjust selection indices
    const offset = isBold ? -2 : 2;
    setSelectionStart(selectionStart + offset);
    setSelectionEnd(selectionEnd + offset);
  };

  const handleItalicClick = () => {
    if (selectionStart === selectionEnd) return; // No text selected

    const selectedText = text.substring(selectionStart, selectionEnd);
    let newText;

    if (isItalic && selectedText.startsWith('_') && selectedText.endsWith('_')) {
      // If selected text is already italic, remove the italic syntax
      newText = text.substring(0, selectionStart) + selectedText.slice(1, -1) + text.substring(selectionEnd);
    } else {
      // Otherwise, add italic syntax
      newText = text.substring(0, selectionStart) + '_' + selectedText + '_' + text.substring(selectionEnd);
    }

    setText(newText);
    setIsItalic(!isItalic);

    // Adjust selection indices
    const offset = isItalic ? -1 : 1;
    setSelectionStart(selectionStart + offset);
    setSelectionEnd(selectionEnd + offset);
  };

  const handleHeadingClick = () => {
    if (selectionStart === selectionEnd) return; // No text selected

    const selectedText = text.substring(selectionStart, selectionEnd);

    // Toggle heading formatting
    setIsHeading(!isHeading);

    // Toggle heading style
    const newText = isHeading
      ? text.substring(0, selectionStart) + selectedText + text.substring(selectionEnd)
      : text.substring(0, selectionStart) + (selectedText.startsWith('# ') ? selectedText.slice(2) : selectedText) + text.substring(selectionEnd);

    setText(newText);
  };

  const parseMarkdown = (markdown) => {
    // Remove heading syntax from markdown
    const withoutHeading = markdown.replace(/^# /gm, '');

    // Replace bold syntax with HTML strong tags
    const withBold = withoutHeading.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');

    // Replace italic syntax with HTML em tags
    const withItalic = withBold.replace(/_(.*?)_/g, '<em>$1</em>');

    return withItalic;
  };

  const handleTextChange = (event) => {
    setText(event.target.value);
  };

  const handleSelectionChange = (event) => {
    setSelectionStart(event.target.selectionStart);
    setSelectionEnd(event.target.selectionEnd);
  };

  const textSelected = selectionStart !== selectionEnd;
  const style = {
    color: textSelected ? 'white' : 'initial',
  };

  return (
    <div>
      <textarea
        value={text}
        onChange={handleTextChange}
        onSelect={handleSelectionChange}
        style={style}
      />
      <button onClick={handleBoldClick} disabled={!textSelected}>{isBold ? "Unbold" : "Bold"}</button>
      <button onClick={handleItalicClick} disabled={!textSelected}>{isItalic ? "Unitalic" : "Italic"}</button>
      <button onClick={handleHeadingClick} disabled={!textSelected}>H1</button>
      <div>
        <strong>Preview:</strong>
        <div style={{ fontSize: isHeading ? '24px' : '16px' }}>
          <div dangerouslySetInnerHTML={{ __html: parseMarkdown(text) }} />
        </div>
      </div>
    </div>
  );
};

export default App;
