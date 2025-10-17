class LikesController < ApplicationController
  resource_description do
    short "Likes API"
    description "API for managing likes on posts and comments"
    formats [ "json" ]
  end

  api :POST, "/likes", "Create a new like"
  param :user_id, :number, desc: "User ID who created the like", required: true
  param :likeable_type, String, desc: "Type of object being liked (Post or Comment)", required: true
  param :likeable_id, :number, desc: "ID of the object being liked", required: true
  error 422, "Validation failed - user cannot like their own content, duplicate like, or missing required fields"
  def create
    build_like
    save_like or render_errors
  end

  api :DELETE, "/likes/:id", "Remove a like"
  param :id, :number, desc: "Like ID", required: true
  def destroy
    load_like
    @like.destroy if @like.present?
  end

  private

  def build_like
    @like ||= Like.new
    @like.attributes = like_params
  end

  def load_like
    @like ||= Like.find_by(id: params[:id])
  end

  def save_like
    @like.save
  end

  def like_params
    params.permit(:user_id, :likeable_type, :likeable_id)
  end

  def render_errors
    render json: { errors: @like.errors }, status: :unprocessable_entity
  end
end
