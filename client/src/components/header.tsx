import { Sun, Bell, Download, Plus, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";

interface HeaderProps {
  onSidebarToggle: () => void;
}

export default function Header({ onSidebarToggle }: HeaderProps) {
  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <button
            onClick={onSidebarToggle}
            className="lg:hidden p-1.5 rounded-md hover:bg-gray-100 transition-colors"
            data-testid="button-mobile-menu"
          >
            <Menu className="h-4 w-4 text-text-secondary" />
          </button>
          <div className="flex items-center space-x-2">
            <span className="text-lg">👋</span>
            <h1 className="text-lg font-medium text-text-primary">Good Morning, Dr. Robert!</h1>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <button 
            className="text-text-secondary hover:text-text-primary p-1.5 rounded-md hover:bg-gray-100"
            data-testid="button-notifications"
          >
            <Bell className="h-4 w-4" />
          </button>
          <Button 
            variant="outline" 
            size="sm"
            className="flex items-center space-x-1 text-text-secondary text-xs px-3 py-1.5 h-8 border-gray-300"
            data-testid="button-export"
          >
            <Download className="h-3 w-3" />
            <span>Export</span>
          </Button>
          <Button 
            size="sm"
            className="flex items-center space-x-1 bg-medisight-teal text-white hover:bg-medisight-dark-teal text-xs px-3 py-1.5 h-8"
            data-testid="button-create-new"
          >
            <Plus className="h-3 w-3" />
            <span>Create new</span>
          </Button>
        </div>
      </div>
    </header>
  );
}
