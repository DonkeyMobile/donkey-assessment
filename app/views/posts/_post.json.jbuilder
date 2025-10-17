json.extract! post, :id, :description, :created_at, :updated_at
json.user do
  json.extract! post.user, :id, :name
end
json.attachments post.attachments do |attachment|
  json.id attachment.id
  json.filename attachment.filename.to_s
  json.content_type attachment.content_type
  json.byte_size attachment.byte_size
  json.url rails_blob_url(attachment, only_path: true)
end
json.comments post.comments do |comment|
  json.extract! comment, :id, :body, :created_at, :updated_at
  json.user do
    json.extract! comment.user, :id, :name
  end
end
json.likes post.likes do |like|
  json.user do
    json.extract! like.user, :id, :name
  end
end
