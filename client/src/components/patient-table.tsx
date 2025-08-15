import { useState } from "react";
import { Search, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import type { Patient } from "@shared/schema";

interface PatientTableProps {
  patients: Patient[];
}

export default function PatientTable({ patients }: PatientTableProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedPatients, setSelectedPatients] = useState<string[]>([]);

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const getAvatarColor = (name: string) => {
    const colors = [
      'bg-red-100 text-red-600',
      'bg-blue-100 text-blue-600',
      'bg-green-100 text-green-600',
      'bg-purple-100 text-purple-600',
      'bg-yellow-100 text-yellow-600',
      'bg-indigo-100 text-indigo-600',
    ];
    const index = name.length % colors.length;
    return colors[index];
  };

  const calculateAge = (dateOfBirth: string) => {
    const birth = new Date(dateOfBirth);
    const today = new Date();
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      age--;
    }
    
    return `${age} years old`;
  };

  const filteredPatients = patients.filter(patient =>
    patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.patientId.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedPatients(filteredPatients.map(p => p.id));
    } else {
      setSelectedPatients([]);
    }
  };

  const handleSelectPatient = (patientId: string, checked: boolean) => {
    if (checked) {
      setSelectedPatients([...selectedPatients, patientId]);
    } else {
      setSelectedPatients(selectedPatients.filter(id => id !== patientId));
    }
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
      <div className="p-4 sm:p-6 border-b border-gray-200">
        <h3 className="text-base sm:text-lg font-semibold text-text-primary mb-3 sm:mb-4">Patient list</h3>
        
        {/* Search and Filter */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between space-y-3 sm:space-y-0">
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-3 h-4 w-4 text-text-secondary" />
            <Input
              type="text"
              placeholder="Search..."
              className="pl-10 w-full"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              data-testid="input-patient-search"
            />
          </div>
          <div className="flex items-center space-x-2 sm:space-x-3">
            <Button 
              variant="outline" 
              className="flex items-center space-x-2 text-text-secondary hover:bg-gray-50 text-sm"
              data-testid="button-filter"
            >
              <Filter className="h-4 w-4" />
              <span className="hidden sm:inline">Filter</span>
            </Button>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-28 sm:w-32 text-sm" data-testid="select-status-filter">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Desktop Table */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="text-left py-3 px-4 lg:px-6 text-xs font-medium text-text-secondary uppercase tracking-wider">
                <Checkbox
                  checked={selectedPatients.length === filteredPatients.length && filteredPatients.length > 0}
                  onCheckedChange={handleSelectAll}
                  data-testid="checkbox-select-all"
                />
              </th>
              <th className="text-left py-3 px-4 lg:px-6 text-xs font-medium text-text-secondary uppercase tracking-wider">
                Name
              </th>
              <th className="text-left py-3 px-4 lg:px-6 text-xs font-medium text-text-secondary uppercase tracking-wider">
                Gender
              </th>
              <th className="text-left py-3 px-4 lg:px-6 text-xs font-medium text-text-secondary uppercase tracking-wider">
                Date of Birth
              </th>
              <th className="text-left py-3 px-4 lg:px-6 text-xs font-medium text-text-secondary uppercase tracking-wider">
                Age
              </th>
              <th className="text-left py-3 px-4 lg:px-6 text-xs font-medium text-text-secondary uppercase tracking-wider">
                Department
              </th>
              <th className="text-left py-3 px-4 lg:px-6 text-xs font-medium text-text-secondary uppercase tracking-wider">
                Patient ID
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filteredPatients.length === 0 ? (
              <tr>
                <td colSpan={7} className="py-8 text-center text-text-secondary">
                  {searchTerm ? "No patients found matching your search" : "No patients available"}
                </td>
              </tr>
            ) : (
              filteredPatients.map((patient, index) => (
                <tr 
                  key={patient.id} 
                  className="hover:bg-gray-50 transition-colors"
                  data-testid={`row-patient-${index}`}
                >
                  <td className="py-4 px-4 lg:px-6">
                    <Checkbox
                      checked={selectedPatients.includes(patient.id)}
                      onCheckedChange={(checked) => handleSelectPatient(patient.id, checked as boolean)}
                      data-testid={`checkbox-patient-${index}`}
                    />
                  </td>
                  <td className="py-4 px-4 lg:px-6">
                    <div className="flex items-center space-x-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${getAvatarColor(patient.name)}`}>
                        <span className="font-semibold text-xs">
                          {getInitials(patient.name)}
                        </span>
                      </div>
                      <span className="font-medium text-sm text-text-primary" data-testid={`text-patient-name-${index}`}>
                        {patient.name}
                      </span>
                    </div>
                  </td>
                  <td className="py-4 px-4 lg:px-6 text-sm text-text-secondary" data-testid={`text-patient-gender-${index}`}>
                    {patient.gender}
                  </td>
                  <td className="py-4 px-4 lg:px-6 text-sm text-text-secondary" data-testid={`text-patient-dob-${index}`}>
                    {patient.dateOfBirth}
                  </td>
                  <td className="py-4 px-4 lg:px-6 text-sm text-text-secondary" data-testid={`text-patient-age-${index}`}>
                    {calculateAge(patient.dateOfBirth)}
                  </td>
                  <td className="py-4 px-4 lg:px-6 text-sm text-text-secondary" data-testid={`text-patient-department-${index}`}>
                    {patient.department}
                  </td>
                  <td className="py-4 px-4 lg:px-6 text-sm text-text-secondary" data-testid={`text-patient-id-${index}`}>
                    {patient.patientId}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="md:hidden space-y-3">
        {filteredPatients.length === 0 ? (
          <div className="py-8 text-center text-text-secondary">
            {searchTerm ? "No patients found matching your search" : "No patients available"}
          </div>
        ) : (
          filteredPatients.map((patient, index) => (
            <div 
              key={patient.id} 
              className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
              data-testid={`card-patient-${index}`}
            >
              <div className="flex items-start space-x-3">
                <Checkbox
                  checked={selectedPatients.includes(patient.id)}
                  onCheckedChange={(checked) => handleSelectPatient(patient.id, checked as boolean)}
                  data-testid={`checkbox-patient-mobile-${index}`}
                  className="mt-1"
                />
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${getAvatarColor(patient.name)} flex-shrink-0`}>
                  <span className="font-semibold text-sm">
                    {getInitials(patient.name)}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="font-medium text-text-primary truncate" data-testid={`text-patient-name-mobile-${index}`}>
                      {patient.name}
                    </h4>
                    <span className="text-xs text-text-secondary bg-gray-100 px-2 py-1 rounded ml-2" data-testid={`text-patient-id-mobile-${index}`}>
                      {patient.patientId}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-xs text-text-secondary">
                    <div>
                      <span className="font-medium">Gender:</span> {patient.gender}
                    </div>
                    <div>
                      <span className="font-medium">Age:</span> {calculateAge(patient.dateOfBirth)}
                    </div>
                    <div>
                      <span className="font-medium">DOB:</span> {patient.dateOfBirth}
                    </div>
                    <div>
                      <span className="font-medium">Dept:</span> {patient.department}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
