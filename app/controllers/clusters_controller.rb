class ClustersController < ApplicationController
    def index
        clusters = Cluster.all
        render json: clusters
    end

    def show
        cluster = Cluster.find_by(id: params[:id])
        if cluster
          render json: cluster
        else
          render json: { error: "Cluster not found" }, status: :not_found
        end
    end
end
