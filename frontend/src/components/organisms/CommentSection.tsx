'use client';
import React, { useEffect, useRef, useState } from 'react';
import { formatDateFromTimestamp } from '@/lib/date-format';
import AddComment from '../molecules/comments/AddComment';
import CommentCard from '../molecules/comments/CommentCard';
import CommentDate from '../molecules/comments/CommentDate';
import CommentContextProvider from '../context/CommentContext';
import { useAuth } from '../context/AuthContext';
import Button from '../atoms/Button';

const CommentSection = () => {
  const commentsRef = useRef<HTMLDivElement | null>(null);
  const containerScrollRef = useRef<HTMLDivElement | null>(null);
  const [isInitialLoad, setIsInitialLoad] = useState<boolean>(true);
  const [firstCommentId, setFirstCommentId] = useState<string>('');
  const { userName } = useAuth();

  const [comments, setComments] = useState(getComments());

  const loadMoreComments = () => {
    setComments(getComments());
  };

  const handleScroll = () => {
    if (containerScrollRef.current) {
      if (containerScrollRef.current.scrollTop === 0) {
        setFirstCommentId(comments[0].id);
        loadMoreComments();
        const element = document.getElementById(firstCommentId);
        element?.scrollIntoView();
      }
    }
  };

  useEffect(() => {
    if (commentsRef.current)
      if (containerScrollRef.current?.scrollTop !== 0 || isInitialLoad)
        commentsRef.current.scrollIntoView();
    setIsInitialLoad(false);
  }, [comments]);

  return (
    <div className="w-full flex items-center flex-col">
      <h3 className="display-2 m-4">Comments:</h3>
      <CommentContextProvider>
        <div
          ref={containerScrollRef}
          onScroll={handleScroll}
          className="max-w-[1000px] h-[550px] px-6 w-full overflow-y-auto bg-background rounded-md border-[1px] border-primary"
        >
          <div className="flex flex-col gap-4 relative min-h-full py-8">
            {comments.map((comment, index) => (
              <div id={comment.id} key={index}>
                {index === 0 && <CommentDate timestamp={comment.timestamp} />}
                {comments[index + 1] &&
                  formatDateFromTimestamp(comment.timestamp) !==
                    formatDateFromTimestamp(comments[index + 1].timestamp) && (
                    <CommentDate timestamp={comments[index + 1].timestamp} />
                  )}
                <CommentCard key={comment.id} comment={comment} />
              </div>
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
    text: 'Hey, does anyone know how many bytes are in a megabyte?',
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
    text: 'I think it’s 1024 bytes in a megabyte, but don’t quote me on that!',
    timestamp: 414514860000,
    replies: [
      {
        id: '10',
        author: {
          name: 'Adrian',
          picture:
            'https://i.scdn.co/image/ab6761670000ecd4551166d4f402a9b7b55f1bcd',
        },
        text: 'Yes, you’re right, Hary. 1024 bytes make 1MB.',
        timestamp: 414524740000,
      },
    ],
  },
  {
    id: '3',
    author: {
      name: 'Adrian',
      picture:
        'https://i.scdn.co/image/ab6761670000ecd4551166d4f402a9b7b55f1bcd',
    },
    text: 'I had to check my phone to be sure, but it’s indeed 1024 bytes.',
    timestamp: 414516900000,
  },
  {
    id: '4',
    author: {
      name: 'Franko',
      picture:
        'https://all-digital.org/wp-content/uploads/2023/07/Tomislav-Jagust-scaled.jpg',
    },
    text: 'Just convert everything to megabytes, and you’re good to go. It’s easier that way!',
    timestamp: 1737033897699,
    replies: [
      {
        id: '11',
        author: {
          name: 'Matija',
          picture:
            'https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png',
        },
        text: 'Matija agrees, sometimes it’s just about making life simpler!',
        timestamp: 1737033997699,
      },
    ],
  },
  {
    id: '5',
    author: {
      name: 'Matija',
      picture:
        'https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png',
    },
    text: 'I’ve got this great calculator app to convert everything. Anyone else use one?',
    timestamp: 1737054900000,
  },
  {
    id: '6',
    parent_id: '5',
    author: {
      name: 'Franko',
      picture:
        'https://all-digital.org/wp-content/uploads/2023/07/Tomislav-Jagust-scaled.jpg',
    },
    text: 'Yeah, I use it too. It’s so handy when I’m trying to convert file sizes.',
    timestamp: 1737120297699,
  },
  {
    id: '7',
    author: {
      name: 'Hary',
      picture:
        'https://www.shutterstock.com/image-photo/handsome-man-black-suit-white-600nw-1091729747.jpg',
    },
    text: 'I wish I could delete files and not lose important data!',
    timestamp: 1737132400000,
  },
  {
    id: '8',
    author: {
      name: 'Adrian',
      picture:
        'https://i.scdn.co/image/ab6761670000ecd4551166d4f402a9b7b55f1bcd',
    },
    text: 'Just back it up in the cloud, you can never have too many backups.',
    timestamp: 1737132700000,
  },
  {
    id: '9',
    author: {
      name: 'Ivan',
      picture:
        'https://media.licdn.com/dms/image/v2/D4D03AQG7RFluYex77Q/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1727864987263?e=2147483647&v=beta&t=_p_ltb_trVgZMZDlrfV3a32B3zbK9u2MENz43ek8sUE',
    },
    text: 'Is anyone else annoyed by how slow my laptop gets when the hard drive is almost full?',
    timestamp: 1737121297699,
    replies: [
      {
        id: '12',
        author: {
          name: 'Matija',
          picture:
            'https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png',
        },
        text: 'I totally get you. Cleaning up unnecessary files helps, though.',
        timestamp: 1737121397699,
      },
    ],
  },
  {
    id: '10',
    author: {
      name: 'Matija',
      picture:
        'https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png',
    },
    text: 'Anyone else here still use CDs? I feel like I’m the only one...',
    timestamp: 1737258800000,
    replies: [
      {
        id: '13',
        author: {
          name: 'Hary',
          picture:
            'https://www.shutterstock.com/image-photo/handsome-man-black-suit-white-600nw-1091729747.jpg',
        },
        text: 'I used to, but now everything’s digital. It’s the way to go!',
        timestamp: 1737258900000,
      },
    ],
  },
  {
    id: '11',
    author: {
      name: 'Franko',
      picture:
        'https://all-digital.org/wp-content/uploads/2023/07/Tomislav-Jagust-scaled.jpg',
    },
    text: 'I miss the old days when we had floppy disks. Anyone else with me?',
    timestamp: 1737259000000,
  },
  {
    id: '12',
    parent_id: '11',
    author: {
      name: 'Adrian',
      picture:
        'https://i.scdn.co/image/ab6761670000ecd4551166d4f402a9b7b55f1bcd',
    },
    text: 'Floppy disks were cool, but they really didn’t hold much data. We’ve come a long way!',
    timestamp: 1737259100000,
  },
  {
    id: '13',
    author: {
      name: 'Hary',
      picture:
        'https://www.shutterstock.com/image-photo/handsome-man-black-suit-white-600nw-1091729747.jpg',
    },
    text: 'I think I’m going to switch to a gaming PC. Can anyone suggest a good setup?',
    timestamp: 1737259200000,
    replies: [
      {
        id: '14',
        author: {
          name: 'Franko',
          picture:
            'https://all-digital.org/wp-content/uploads/2023/07/Tomislav-Jagust-scaled.jpg',
        },
        text: 'Get something with a good graphics card, 16GB RAM, and a solid-state drive.',
        timestamp: 1737259300000,
      },
    ],
  },
  {
    id: '14',
    author: {
      name: 'Ivan',
      picture:
        'https://media.licdn.com/dms/image/v2/D4D03AQG7RFluYex77Q/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1727864987263?e=2147483647&v=beta&t=_p_ltb_trVgZMZDlrfV3a32B3zbK9u2MENz43ek8sUE',
    },
    text: 'How often do you guys update your software? I feel like I’m always behind.',
    timestamp: 1737259400000,
    replies: [
      {
        id: '15',
        author: {
          name: 'Matija',
          picture:
            'https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png',
        },
        text: 'I do it every month, but I keep putting off the major updates.',
        timestamp: 1737259500000,
      },
    ],
  },
  {
    id: '15',
    author: {
      name: 'Franko',
      picture:
        'https://all-digital.org/wp-content/uploads/2023/07/Tomislav-Jagust-scaled.jpg',
    },
    text: 'I’ve got to admit, sometimes I ignore updates. But I really should be more diligent.',
    timestamp: 1737259600000,
  },
  {
    id: '16',
    author: {
      name: 'Adrian',
      picture:
        'https://i.scdn.co/image/ab6761670000ecd4551166d4f402a9b7b55f1bcd',
    },
    text: 'Do any of you guys ever clean your keyboard? I can never seem to get rid of the crumbs.',
    timestamp: 1737259700000,
  },
  {
    id: '17',
    parent_id: '16',
    author: {
      name: 'Ivan',
      picture:
        'https://media.licdn.com/dms/image/v2/D4D03AQG7RFluYex77Q/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1727864987263?e=2147483647&v=beta&t=_p_ltb_trVgZMZDlrfV3a32B3zbK9u2MENz43ek8sUE',
    },
    text: 'I just use compressed air to clean mine. Works wonders!',
    timestamp: 1737259800000,
  },
  {
    id: '18',
    author: {
      name: 'Matija',
      picture:
        'https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png',
    },
    text: 'What’s the best way to organize my desktop? It’s getting messy...',
    timestamp: 1737259900000,
    replies: [
      {
        id: '19',
        author: {
          name: 'Franko',
          picture:
            'https://all-digital.org/wp-content/uploads/2023/07/Tomislav-Jagust-scaled.jpg',
        },
        text: 'Create folders for everything. It’s the only way to stay organized!',
        timestamp: 1737260000000,
      },
    ],
  },
  {
    id: '19',
    author: {
      name: 'Hary',
      picture:
        'https://www.shutterstock.com/image-photo/handsome-man-black-suit-white-600nw-1091729747.jpg',
    },
    text: 'Anyone know any good websites for free stock photos?',
    timestamp: 1737260100000,
    replies: [
      {
        id: '20',
        author: {
          name: 'Adrian',
          picture:
            'https://i.scdn.co/image/ab6761670000ecd4551166d4f402a9b7b55f1bcd',
        },
        text: 'I use Unsplash. Great quality photos, and completely free to use.',
        timestamp: 1737260200000,
      },
    ],
  },
];

let index = -10;
const getComments = () => {
  console.log('index', index);
  let comments = commentsMock.slice(index);
  console.log('Comments: ', comments);
  index -= 10;
  return comments;
};

export const getAuthorById = (id: string) => {
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
    return null;
  };

  return findComment(commentsMock);
};
