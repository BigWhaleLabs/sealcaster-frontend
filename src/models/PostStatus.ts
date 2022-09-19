enum PostStatus {
  approved = 'approved',
  published = 'published',
  rejected = 'rejected',
  pending = 'pending',
  failedToPost = 'failedToPost',
}

enum PostStatusText {
  approved = 'Posting to Farcaster...',
  published = 'Farcaster',
  failedToPost = 'Failed to post',
  rejected = 'Rejected',
  pending = 'Pending...',
}

export { PostStatus, PostStatusText }
