class RemoveLocationFromEvents < ActiveRecord::Migration[5.0]
  def change
    remove_column :events, :location, :string
  end
end
