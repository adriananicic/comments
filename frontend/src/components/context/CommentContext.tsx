import { createContext, ReactNode, useContext, useState } from 'react';

interface ICommentContext {
  replyToId: string | null;
  setReplyToId: (value: string | null) => void;
  replyToText: string | null;
  setReplyToText: (value: string | null) => void;
}

const CommentContext = createContext<ICommentContext>({
  replyToId: null,
  setReplyToId: () => {},
  setReplyToText: () => {},
  replyToText: null,
});

const CommentContextProvider = ({ children }: { children: ReactNode }) => {
  const [replyToId, setReplyToId] = useState<string | null>(null);
  const [replyToText, setReplyToText] = useState<string | null>(null);
  return (
    <CommentContext.Provider
      value={{
        replyToId: replyToId,
        setReplyToId: setReplyToId,
        setReplyToText,
        replyToText,
      }}
    >
      ,{children}
    </CommentContext.Provider>
  );
};

export default CommentContextProvider;

export const useCommentId = () => {
  const context = useContext(CommentContext);
  if (!context)
    throw new Error('useCommentId must be used within a CommentsProvider');

  return context;
};
