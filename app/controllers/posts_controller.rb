class PostsController < ApplicationController
  rescue_from ActiveRecord::RecordNotFound, with: :not_found

  def index
    load_posts
  end

  def show
    load_post
  end

  def create
    build_post
    save_post or render_errors
  end

  def update
    load_post
    build_post
    save_post or render_errors
  end

  def destroy
    load_post
    @post.destroy
  end

  private

  def load_posts
    @posts ||= post_scope
  end

  def load_post
    @post ||= post_scope.find(params[:id])
  end

  def post_scope
    Post.all
  end

  def build_post
    @post ||= post_scope.build
    @post.attributes = post_params
  end

  def save_post
    @post.save
  end

  def post_params
    params.permit(:description, :user_id)
  end

  def render_errors
    render json: { errors: @post.errors }, status: :unprocessable_entity
  end

  def not_found
    render json: { error: "Post not found" }, status: :not_found
  end
end
