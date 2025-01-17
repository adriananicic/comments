import Button from '@/components/atoms/Button';
import React from 'react';

const AddComment = () => {
  return (
    <div className="sticky bottom-4 left-8 right-8 w-full  gap-4 p-2 bg-primary-weak border-[1px] border-primary-medium rounded-md flex justify-between items-center">
      <Button buttonType="normal" icon="plus" />
      <input className="flex-grow py-4 outline-none" type="text" />
      <Button buttonType="normal" label="Send message" icon="send" />
    </div>
  );
};

export default AddComment;
