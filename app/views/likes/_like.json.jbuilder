json.extract! like, :id, :likeable_type, :likeable_id, :created_at, :updated_at
json.user do
  json.extract! like.user, :id, :name
end
