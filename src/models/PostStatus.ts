enum PostStatus {
  approved = 'approved',
  published = 'published',
  rejected = 'rejected',
  pending = 'pending',
}

enum PostStatusText {
  approved = 'Posting to Farcaster...',
  published = 'Farcaster',
  rejected = 'Rejected',
  pending = 'Pending...',
}

export { PostStatus, PostStatusText }
