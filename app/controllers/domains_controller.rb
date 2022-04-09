class DomainsController < ApplicationController
    def index
        domains = Domain.all
        render json: domains
    end

    def show
        domain = Domain.find_by(id: session[:user_id])
        if user
          render json: domain
        else
          render json: { error: "Not authorized" }, status: :unauthorized
        end
    end
end
