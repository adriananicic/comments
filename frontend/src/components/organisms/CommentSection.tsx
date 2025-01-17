'use client';
import React, { useEffect, useRef, useState } from 'react';
import { formatDateFromTimestamp } from '@/lib/date-format';
import AddComment from '../molecules/comments/AddComment';
import CommentCard from '../molecules/comments/CommentCard';
import CommentDate from '../molecules/comments/CommentDate';
import CommentContextProvider from '../context/CommentContext';
import { useAuth } from '../context/AuthContext';

const CommentSection = () => {
  const commentsRef = useRef<HTMLDivElement | null>(null);
  const { userName } = useAuth();

  const [comments, setComments] = useState(commentsMock);

  useEffect(() => {
    if (commentsRef.current) commentsRef.current.scrollIntoView();
  }, [comments]);

  return (
    <div className="w-full flex items-center flex-col">
      <h3 className="display-2 m-4">Comments:</h3>
      <CommentContextProvider>
        <div className="max-w-[1000px] h-[550px] px-6 w-full overflow-y-auto bg-background rounded-md border-[1px] border-primary">
          <div className="flex flex-col gap-4 relative min-h-full py-8">
            {comments.map((comment, index) => (
              <>
                {index === 0 && <CommentDate timestamp={comment.timestamp} />}
                {commentsMock[index + 1] &&
                  formatDateFromTimestamp(comment.timestamp) !==
                    formatDateFromTimestamp(comments[index + 1].timestamp) && (
                    <CommentDate timestamp={comments[index + 1].timestamp} />
                  )}
                <CommentCard key={comment.id} comment={comment} />
              </>
            ))}
          </div>
          <AddComment
            onClick={(value) => {
              if (value) {
                const newComment = {
                  text: value,
                  author: {
                    name: userName ? userName : 'trebadabudemulogiran',
                    picture:
                      'https://i.scdn.co/image/ab6761670000ecd4551166d4f402a9b7b55f1bcd',
                  },
                  id: '19',
                  timestamp: Date.now(),
                  parent_id: undefined,
                };
                setComments((prev) => [...prev, newComment]);
              }
            }}
          />

          <div ref={commentsRef} />
        </div>
      </CommentContextProvider>
    </div>
  );
};

export default CommentSection;

const commentsMock = [
  {
    id: '1',
    author: {
      name: 'Ivan',
      picture:
        'https://media.licdn.com/dms/image/v2/D4D03AQG7RFluYex77Q/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1727864987263?e=2147483647&v=beta&t=_p_ltb_trVgZMZDlrfV3a32B3zbK9u2MENz43ek8sUE',
    },
    text: 'Hello there, so I was wondering if you know how much MB is in a GB?',
    timestamp: 414514740000,
  },
  {
    id: '2',
    parent_id: '1',
    author: {
      name: 'Hary',
      picture:
        'https://www.shutterstock.com/image-photo/handsome-man-black-suit-white-600nw-1091729747.jpg',
    },
    text: 'Hey Ivan! Have you tried Googling that?',
    timestamp: 414514860000,
    replies: [
      {
        id: '10',
        author: {
          name: 'Franko',
          picture:
            'https://all-digital.org/wp-content/uploads/2023/07/Tomislav-Jagust-scaled.jpg',
        },
        text: 'Ne govno',
        timestamp: 414524740000,
      },
      {
        id: '11',
        author: {
          name: 'Adrian',
          picture:
            'https://i.scdn.co/image/ab6761670000ecd4551166d4f402a9b7b55f1bcd',
        },
        text: 'Ne govno',
        timestamp: 414524740000,
      },
    ],
  },
  {
    id: '3',
    parent_id: '1',
    author: {
      name: 'Adrian',
      picture:
        'https://i.scdn.co/image/ab6761670000ecd4551166d4f402a9b7b55f1bcd',
    },
    text: 'Hary has a point, tho I’d say it’s about 1000MB in a GB.',
    timestamp: 414516900000,
  },
  {
    id: '4',
    author: {
      name: 'Franko',
      picture:
        'https://all-digital.org/wp-content/uploads/2023/07/Tomislav-Jagust-scaled.jpg',
    },
    text: 'Hey guys, here is a nice web for that complicated conversion: www.convertunits.com/from/MB/to/GB',
    timestamp: 1737033897699,
  },

  {
    id: '6',
    author: {
      name: 'Franko',
      picture:
        'https://all-digital.org/wp-content/uploads/2023/07/Tomislav-Jagust-scaled.jpg',
    },
    text: "https://<script>alert('franko')</script>",
    timestamp: 1737120297699,
  },
];

export const getAuthorById = (id: string) => {
  // Recursive helper function to search through comments and their replies
  const findComment: any = (commentsList: any) => {
    for (const comment of commentsList) {
      if (comment.id === id) {
        return comment.author.name;
      }
      if (comment.replies) {
        const found = findComment(comment.replies);
        if (found) return found;
      }
    }
    return null; // Return null if no matching comment is found
  };

  return findComment(commentsMock);
};
