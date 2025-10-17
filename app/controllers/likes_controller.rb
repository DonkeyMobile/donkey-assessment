class LikesController < ApplicationController
  def create
    build_like
    save_like or render_errors
  end

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
