class CommentsController < ApplicationController
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
