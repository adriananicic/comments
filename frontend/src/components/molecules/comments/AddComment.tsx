import Button from '@/components/atoms/Button';
import { useCommentId } from '@/components/context/CommentContext';
import { getAuthorById } from '@/components/organisms/CommentSection';
import React, { useEffect, useRef, useState } from 'react';

const AddComment = ({ onClick }: { onClick: (value: any) => void }) => {
  const [text, setText] = useState<string>('');
  const { replyToId, setReplyToId, replyToText, setReplyToText } =
    useCommentId();
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (replyToId) inputRef.current?.focus();
  }, [replyToId]);

  return (
    <div className="sticky bottom-4 left-8 right-8 w-full gap-2">
      {replyToText && (
        <div className=" p-1 bg-[#023168]/25 backdrop-blur-2xl my-1 cursor-pointer text-primary-weak rounded-md -top-10  w-full ">
          {replyToText?.substring(0, 60)}...
        </div>
      )}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onClick(text);
          setText('');
        }}
        className="  gap-4 p-2 bg-primary-weak border-[1px] border-primary-medium rounded-md flex justify-between items-center"
      >
        <Button buttonType="normal" icon="plus" />
        {replyToId && (
          <div
            onClick={() => {
              setReplyToId(null);
              setReplyToText(null);
            }}
            className="text-xs p-2 rounded-md bg-primary-strong cursor-pointer text-primary-weak opacity-50 "
          >
            Replying to {getAuthorById(replyToId)}
          </div>
        )}
        <input
          ref={inputRef}
          onChange={(e) => {
            setText(e.target.value);
          }}
          className="flex-grow py-4 outline-none"
          value={text}
          type="text"
        />
        <Button
          buttonType="normal"
          label="Send message"
          icon="send"
          type="submit"
        />
      </form>
    </div>
  );
};

export default AddComment;
