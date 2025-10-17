class PostsController < ApplicationController
  rescue_from ActiveRecord::RecordNotFound, with: :not_found

  resource_description do
    short "Posts API"
    description "API for managing posts with attachments, comments, and likes"
    formats [ "json" ]
  end

  DEFAULT_PER_PAGE = 10
  DEFAULT_SORT = :desc

  api :GET, "/posts", "List all posts"
  param :page, :number, desc: "Page number for pagination", required: false
  param :per_page, :number, desc: "Number of posts per page (default: 10)", required: false
  param :sort, String, desc: "Sort order (asc or desc, default: desc)", required: false
  def index
    load_posts
    paginate_posts
    order_posts
  end

  api :GET, "/posts/:id", "Show a specific post"
  param :id, :number, desc: "Post ID", required: true
  error 404, "Post not found"
  def show
    load_post
  end

  api :POST, "/posts", "Create a new post"
  param :description, String, desc: "Post description", required: true
  param :user_id, :number, desc: "User ID who created the post", required: true
  param :attachments, Array, desc: "Array of file attachments", required: false
  error 422, "Validation failed - missing required fields or invalid data"
  def create
    build_post
    save_post or render_errors
  end

  api :PUT, "/posts/:id", "Update a post"
  param :id, :number, desc: "Post ID", required: true
  param :description, String, desc: "Updated post description", required: false
  param :user_id, :number, desc: "User ID who created the post", required: false
  param :attachments, Array, desc: "Array of file attachments", required: false
  error 404, "Post not found"
  error 422, "Validation failed - invalid data"
  def update
    load_post
    build_post
    save_post or render_errors
  end

  api :DELETE, "/posts/:id", "Delete a post"
  param :id, :number, desc: "Post ID", required: true
  error 404, "Post not found"
  def destroy
    load_post
    @post.destroy
  end

  private

  def load_posts
    @posts ||= post_scope
  end

  def paginate_posts
    @posts = @posts.page(params[:page]).per(params[:per_page] || DEFAULT_PER_PAGE)
  end

  def order_posts
    @posts = @posts.order(created_at: params[:sort] || DEFAULT_SORT)
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
    params.permit(:description, :user_id, attachments: [])
  end

  def render_errors
    render json: { errors: @post.errors }, status: :unprocessable_entity
  end

  def not_found
    render json: { error: "Post not found" }, status: :not_found
  end
end
