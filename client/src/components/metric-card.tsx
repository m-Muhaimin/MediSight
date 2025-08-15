import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

interface MetricCardProps {
  icon: string;
  title: string;
  value: string;
  growth: string;
  "data-testid"?: string;
}

export default function MetricCard({ icon, title, value, growth, "data-testid": testId }: MetricCardProps) {
  const getIconClass = (iconName: string) => {
    switch (iconName) {
      case "users":
        return "fas fa-users";
      case "calendar-check":
        return "fas fa-calendar-check";
      case "dollar-sign":
        return "fas fa-dollar-sign";
      case "procedures":
        return "fas fa-procedures";
      default:
        return "fas fa-circle";
    }
  };

  return (
    <div className="bg-white rounded-xl p-4 sm:p-6 border border-gray-200 shadow-sm" data-testid={testId}>
      <div className="flex items-center justify-between mb-3 sm:mb-4">
        <div className="w-10 h-10 sm:w-12 sm:h-12 bg-medisight-teal bg-opacity-10 rounded-lg flex items-center justify-center">
          <i className={`${getIconClass(icon)} text-medisight-teal text-base sm:text-lg`}></i>
        </div>
        <span className="text-xs sm:text-sm font-medium text-green-600 bg-green-50 px-2 py-1 rounded-full">
          {growth}
        </span>
      </div>
      <p className="text-text-secondary text-xs sm:text-sm mb-1">{title}</p>
      <p className="text-2xl sm:text-3xl font-bold text-text-primary" data-testid={`text-${title.toLowerCase().replace(/\s+/g, '-')}-value`}>
        {value}
      </p>
      <Button 
        variant="ghost" 
        className="text-medisight-teal text-xs sm:text-sm font-medium mt-2 sm:mt-3 p-0 h-auto flex items-center space-x-1 hover:text-medisight-dark-teal transition-colors"
        data-testid={`button-see-details-${title.toLowerCase().replace(/\s+/g, '-')}`}
      >
        <span>See details</span>
        <ArrowRight className="w-3 h-3" />
      </Button>
    </div>
  );
}
