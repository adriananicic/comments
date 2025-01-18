const CommentRenderer = ({ text }: { text: string }) => {
  const renderText = (text: string) => {
    return text.split(' ').map((word, index) => {
      if (word.startsWith('https://') || word.startsWith('www.')) {
        return (
          <a
            key={index}
            href={word.startsWith('www.') ? `https://${word}` : word}
            target="_blank"
            rel="noopener noreferrer"
            className="body-2 text-accent"
          >
            {word}
          </a>
        );
      }
      return (
        <span className="text-primary body-2" key={index}>
          {' '}
          {word}{' '}
        </span>
      );
    });
  };

  return <div>{renderText(text)}</div>;
};

export default CommentRenderer;
