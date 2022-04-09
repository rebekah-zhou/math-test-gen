class ClustersController < ApplicationController
    def index
        clusters = Cluster.all
        render json: clusters
    end

    def show
        cluster = Cluster.find_by(id: session[:user_id])
        if user
          render json: cluster
        else
          render json: { error: "Not authorized" }, status: :unauthorized
        end
    end
end
