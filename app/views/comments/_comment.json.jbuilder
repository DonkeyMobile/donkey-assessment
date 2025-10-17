json.extract! comment, :id, :body, :created_at, :updated_at
json.user do
  json.extract! comment.user, :id, :name
end
json.post do
  json.extract! comment.post, :id, :description
end
json.likes comment.likes do |like|
  json.user do
    json.extract! like.user, :id, :name
  end
end
