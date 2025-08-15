import { Sun, Bell, Download, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Header() {
  return (
    <header className="bg-white border-b border-gray-200 px-8 py-6">
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center space-x-2 mb-1">
            <Sun className="h-5 w-5 text-yellow-500" />
            <h1 className="text-xl font-semibold text-text-primary">Good Morning, Dr. Robert!</h1>
          </div>
          <p className="text-text-secondary">Overview of all of your patients and your income</p>
        </div>
        <div className="flex items-center space-x-3">
          <button 
            className="text-text-secondary hover:text-text-primary"
            data-testid="button-notifications"
          >
            <Bell className="h-5 w-5" />
          </button>
          <Button 
            variant="outline" 
            className="flex items-center space-x-2 text-text-secondary hover:bg-gray-50"
            data-testid="button-export"
          >
            <Download className="h-4 w-4" />
            <span>Export</span>
          </Button>
          <Button 
            className="flex items-center space-x-2 bg-medisight-teal text-white hover:bg-medisight-dark-teal"
            data-testid="button-create-new"
          >
            <Plus className="h-4 w-4" />
            <span>Create new</span>
          </Button>
        </div>
      </div>
    </header>
  );
}
