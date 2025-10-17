class CommentsController < ApplicationController
  resource_description do
    short "Comments API"
    description "API for managing comments on posts"
    formats [ "json" ]
  end

  api :POST, "/comments", "Create a new comment"
  param :body, String, desc: "Comment body text", required: true
  param :user_id, :number, desc: "User ID who created the comment", required: true
  param :post_id, :number, desc: "Post ID to comment on", required: true
  error 422, "Validation failed - missing required fields or invalid data"
  def create
    build_comment
    save_comment or render_errors
  end

  private

  def build_comment
    @comment ||= Comment.new
    @comment.attributes = comment_params
  end

  def save_comment
    @comment.save
  end

  def comment_params
    params.permit(:body, :user_id, :post_id)
  end

  def render_errors
    render json: { errors: @comment.errors }, status: :unprocessable_entity
  end
end
