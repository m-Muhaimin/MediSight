import { Sun, Bell, Download, Plus, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";

interface HeaderProps {
  onSidebarToggle: () => void;
}

export default function Header({ onSidebarToggle }: HeaderProps) {
  return (
    <header className="bg-white border-b border-gray-200 px-4 sm:px-6 lg:px-8 py-4 lg:py-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <button
            onClick={onSidebarToggle}
            className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
            data-testid="button-mobile-menu"
          >
            <Menu className="h-5 w-5 text-text-secondary" />
          </button>
          <div>
            <div className="flex items-center space-x-2 mb-1">
              <Sun className="h-4 w-4 sm:h-5 sm:w-5 text-yellow-500" />
              <h1 className="text-lg sm:text-xl font-semibold text-text-primary">Good Morning, Dr. Robert!</h1>
            </div>
            <p className="text-text-secondary text-sm sm:text-base hidden sm:block">Overview of all of your patients and your income</p>
          </div>
        </div>
        <div className="flex items-center space-x-2 sm:space-x-3">
          <button 
            className="text-text-secondary hover:text-text-primary p-2"
            data-testid="button-notifications"
          >
            <Bell className="h-4 w-4 sm:h-5 sm:w-5" />
          </button>
          <Button 
            variant="outline" 
            className="hidden sm:flex items-center space-x-2 text-text-secondary hover:bg-gray-50"
            data-testid="button-export"
          >
            <Download className="h-4 w-4" />
            <span>Export</span>
          </Button>
          <Button 
            className="flex items-center space-x-2 bg-medisight-teal text-white hover:bg-medisight-dark-teal text-sm sm:text-base"
            data-testid="button-create-new"
          >
            <Plus className="h-4 w-4" />
            <span className="hidden sm:inline">Create new</span>
            <span className="sm:hidden">New</span>
          </Button>
        </div>
      </div>
    </header>
  );
}
