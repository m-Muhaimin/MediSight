import { User, Crown, ChevronDown } from "lucide-react";

export default function Sidebar() {
  const navigationItems = [
    { icon: "th-large", label: "Dashboard", active: true },
    { icon: "users", label: "Patients", active: false },
    { icon: "envelope", label: "Message", active: false },
    { icon: "calendar-alt", label: "Appointments", active: false },
    { icon: "file-invoice", label: "Billing", active: false },
    { icon: "credit-card", label: "Transactions", active: false },
  ];

  const toolItems = [
    { icon: "cog", label: "Settings" },
    { icon: "comments", label: "Chat & Support" },
    { icon: "question-circle", label: "Help Center" },
  ];

  return (
    <div className="w-72 bg-white shadow-sm border-r border-gray-200 flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-medisight-teal rounded-lg flex items-center justify-center">
            <i className="fas fa-stethoscope text-white text-sm"></i>
          </div>
          <span className="font-semibold text-xl text-text-primary">Medisight</span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {navigationItems.map((item, index) => (
            <li key={index}>
              <a
                href="#"
                className={`flex items-center space-x-3 p-3 rounded-lg transition-colors ${
                  item.active
                    ? "bg-medisight-teal text-white"
                    : "text-text-secondary hover:bg-gray-50"
                }`}
                data-testid={`nav-${item.label.toLowerCase().replace(/\s+/g, '-')}`}
              >
                <i className={`fas fa-${item.icon} w-5`}></i>
                <span className="font-medium">{item.label}</span>
              </a>
            </li>
          ))}
        </ul>

        {/* Tools Section */}
        <div className="mt-8">
          <p className="text-xs font-medium text-text-secondary uppercase tracking-wide px-3 mb-3">
            Tools
          </p>
          <ul className="space-y-2">
            {toolItems.map((item, index) => (
              <li key={index}>
                <a
                  href="#"
                  className="flex items-center space-x-3 p-3 rounded-lg text-text-secondary hover:bg-gray-50 transition-colors"
                  data-testid={`tool-${item.label.toLowerCase().replace(/\s+/g, '-')}`}
                >
                  <i className={`fas fa-${item.icon} w-5`}></i>
                  <span className="font-medium">{item.label}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      {/* Upgrade Section */}
      <div className="p-4 border-t border-gray-200">
        <div className="bg-medisight-teal bg-opacity-10 rounded-xl p-4 mb-4">
          <div className="flex items-center space-x-3 mb-3">
            <div className="w-8 h-8 bg-medisight-teal rounded-full flex items-center justify-center">
              <Crown className="text-white w-3 h-3" />
            </div>
            <div>
              <p className="font-semibold text-sm text-text-primary">Upgrade to premium</p>
              <p className="text-xs text-text-secondary">
                Upgrade your account to premium to get more features.
              </p>
            </div>
          </div>
          <button 
            className="w-full bg-text-primary text-white py-2 px-4 rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors"
            data-testid="button-upgrade-plan"
          >
            Upgrade plan
          </button>
        </div>

        {/* User Profile */}
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
            <User className="text-gray-600 w-5 h-5" />
          </div>
          <div className="flex-1">
            <p className="font-medium text-sm text-text-primary">Robert Fox</p>
            <p className="text-xs text-text-secondary">robertfox@email.com</p>
          </div>
          <button className="text-text-secondary hover:text-text-primary" data-testid="button-user-dropdown">
            <ChevronDown className="w-3 h-3" />
          </button>
        </div>
      </div>
    </div>
  );
}
