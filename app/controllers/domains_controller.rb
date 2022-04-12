class DomainsController < ApplicationController
    def index
        domains = Domain.all
        render json: domains
    end

    def show
        domain = Domain.find_by(id: params[:id])
        if domain
          render json: domain
        else
          render json: { error: "Domain not found" }, status: :not_found
        end
    end
end
