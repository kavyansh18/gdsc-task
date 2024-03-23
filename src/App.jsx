import React, { useState } from 'react';

const App = () => {
  const [text, setText] = useState('');
  const [formatBold, setFormatBold] = useState(false);
  const [formatItalic, setFormatItalic] = useState(false);
  const [formatHeading, setFormatHeading] = useState(false);
  const [textSelected, setTextSelected] = useState(false);

  const handleTextChange = (event) => {
    setText(event.target.value);
    const selectionStart = event.target.selectionStart;
    const selectionEnd = event.target.selectionEnd;
    setTextSelected(selectionStart !== selectionEnd);
  };

  const handleFormat = (format) => {
    const selectedText = document.getElementById('text').value;
    let newText;

    switch (format) {
      case 'bold':
        newText = toggleMarkdownSyntax(selectedText, '**', formatBold);
        setFormatBold(!formatBold);
        break;
      case 'italic':
        newText = toggleMarkdownSyntax(selectedText, '_', formatItalic);
        setFormatItalic(!formatItalic);
        break;
      case 'heading':
        newText = toggleHeading(selectedText);
        setFormatHeading(!formatHeading);
        break;
      case 'link':
        newText = wrapInTag(selectedText, 'a', 'href');
        break;
      default:
        break;
    }

    setText(newText);
  };

  const toggleMarkdownSyntax = (selectedText, syntax, currentState) => {
    const wrappedText = syntax + selectedText + syntax;
    return currentState ? selectedText.slice(syntax.length, -syntax.length) : wrappedText;
  };

  const toggleHeading = (selectedText) => {
    const isImage = selectedText.startsWith('![[') && selectedText.endsWith(']]');
    return formatHeading
      ? selectedText
      : isImage
      ? '## ' + selectedText.substring(3, selectedText.length - 2) + ' ##'
      : '# ' + selectedText;
  };

  const wrapInTag = (selectedText, tag, attribute) => {
    return `<${tag} ${attribute}="${selectedText}" target="_blank">${selectedText}</${tag}>`;
  };

  const parseMarkdown = (markdown) => {
    return markdown
      .replace(/^# /gm, '')
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/_(.*?)_/g, '<em>$1</em>');
  };

  return (
    <div className="flex justify-center min-h-screen mt-10">
    <div>
      <div className='font-extrabold text-4xl text-blue-600 mb-10'>Markdown using own custom string manipulation</div>
      <div className="flex flex-col items-center">
        <div className="flex mb-4 gap-4">
          <button className='w-28 text-blue-300' onClick={() => handleFormat('bold')}>{formatBold ? 'Unbold' : 'Bold'}</button>
          <button className='w-28 text-blue-300' onClick={() => handleFormat('italic')}>{formatItalic ? 'Unitalic' : 'Italic'}</button>
          <button className='w-28 text-blue-300' onClick={() => handleFormat('heading')}>{formatHeading ? 'S' : 'H'}</button>
          <button className='w-28 text-blue-300' onClick={() => handleFormat('link')}>Link</button>
        </div>
        <textarea
          id="text"
          value={text}
          onChange={handleTextChange}
          className="text-white w-[611px] h-20  mb-7"
        />
        <div>
          <strong className='font-bold text-2xl flex justify-center items-center'>Preview:</strong>
          <div style={{ fontSize: formatHeading ? '36px' : '16px' }}>
            <div className='w-[600px] break-all ' dangerouslySetInnerHTML={{ __html: parseMarkdown(text) }} />
          </div>
        </div>
      </div>
    </div>
  </div>
  
  );
};

export default App;
