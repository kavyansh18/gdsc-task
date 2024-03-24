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
    <div className="flex flex-col justify-center md:min-h-screen mt-10 px-4">
  <div className='max-w-5xl'>
    <div className='font-extrabold text-2xl md:text-4xl text-blue-600 mb-6 md:mb-10 text-center'>Markdown using own custom string manipulation</div>
    <div className="flex flex-col items-center">
      <div className="flex flex-wrap justify-center mb-4 md:gap-4 gap-1">
        <button className='w-full md:w-28 text-blue-300 mb-2 md:mb-0' onClick={() => handleFormat('bold')}>{formatBold ? 'Unbold' : 'Bold'}</button>
        <button className='w-full md:w-28 text-blue-300 mb-2 md:mb-0' onClick={() => handleFormat('italic')}>{formatItalic ? 'Unitalic' : 'Italic'}</button>
        <button className='w-full md:w-28 text-blue-300 mb-2 md:mb-0' onClick={() => handleFormat('heading')}>{formatHeading ? 'S' : 'H'}</button>
        <button className='w-full md:w-28 text-blue-300 mb-2 md:mb-0' onClick={() => handleFormat('link')}>Link</button>
      </div>
      <textarea
        id="text"
        value={text}
        onChange={handleTextChange}
        className="text-white w-full md:w-[400px] h-20 md:h-40 mb-4 md:mb-7 px-2"
      />
      <div>
        <strong className='font-bold text-lg md:text-2xl flex justify-center items-center mb-2'>Preview:</strong>
        <div style={{ fontSize: formatHeading ? '24px' : '16px' }} className='w-full md:w-[400px] md:break-all'>
          <div dangerouslySetInnerHTML={{ __html: parseMarkdown(text) }} />
        </div>
      </div>
    </div>
  </div>
</div>

  
  );
};

export default App;
