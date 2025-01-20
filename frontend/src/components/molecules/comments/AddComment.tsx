import Button from '@/components/atoms/Button';
import { useAlert } from '@/components/context/AlertContext';
import { useAuth } from '@/components/context/AuthContext';
import { useCommentId } from '@/components/context/CommentContext';
import { useAddComment } from '@/hooks/use-add-comment';
import { usePathname } from 'next/navigation';
import React, {
  ChangeEvent,
  FC,
  FormEvent,
  useEffect,
  useRef,
  useState,
} from 'react';

interface IAddCommentProps {
  refetchComments: () => Promise<void>;
}

const AddComment: FC<IAddCommentProps> = ({ refetchComments }) => {
  const { addComment, isAddingComment } = useAddComment();
  const { userId } = useAuth();

  const [text, setText] = useState<string>('');
  const postId = usePathname().split('/')[2];

  const { replyToId, setReplyToId, replyToText, setReplyToText, replyToName } =
    useCommentId();

  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    if (text != '') {
      e.preventDefault();
      userId && (await addComment(text, userId, postId, replyToId));
      userId && (await refetchComments());
      setText('');
      setReplyToId(null);
      setReplyToText(null);
    }
  };

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
        onSubmit={(e) => handleSubmit(e)}
        className="  gap-4 p-2 bg-primary-weak border-[1px] border-primary-medium rounded-md flex justify-between items-center"
      >
        <Button
          onClick={() => refetchComments()}
          buttonType="normal"
          type="button"
          icon="plus"
        />
        {replyToId && (
          <div
            onClick={() => {
              setReplyToId(null);
              setReplyToText(null);
            }}
            className="text-xs p-2 rounded-md bg-primary-strong cursor-pointer text-primary-weak opacity-50 "
          >
            Replying to {replyToName}
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
          loading={isAddingComment}
        />
      </form>
    </div>
  );
};

export default AddComment;
