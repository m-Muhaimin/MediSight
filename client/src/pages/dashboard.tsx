import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import Sidebar from "@/components/sidebar";
import Header from "@/components/header";
import MetricCard from "@/components/metric-card";
import OverviewChart from "@/components/overview-chart";
import AppointmentList from "@/components/appointment-list";
import PatientTable from "@/components/patient-table";
import { Skeleton } from "@/components/ui/skeleton";
import type { Metrics, Patient, Appointment, ChartData } from "@shared/schema";

export default function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Close sidebar on large screens
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setSidebarOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };
  const { data: metrics, isLoading: metricsLoading } = useQuery<Metrics>({
    queryKey: ["/api/metrics"],
  });

  const { data: patients, isLoading: patientsLoading } = useQuery<Patient[]>({
    queryKey: ["/api/patients"],
  });

  const { data: appointments, isLoading: appointmentsLoading } = useQuery<Appointment[]>({
    queryKey: ["/api/appointments"],
  });

  const { data: chartData, isLoading: chartLoading } = useQuery<ChartData[]>({
    queryKey: ["/api/chart-data"],
  });

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar isOpen={sidebarOpen} onToggle={toggleSidebar} />
      
      <div className="flex-1 overflow-auto min-w-0">
        <Header onSidebarToggle={toggleSidebar} />
        
        <div className="p-4 sm:p-6 lg:p-8">
          <div className="mb-6 lg:mb-8">
            <h2 className="text-xl sm:text-2xl font-semibold text-text-primary mb-2">Dashboard</h2>
          </div>

          {/* Metrics Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 lg:mb-8">
            {metricsLoading ? (
              Array.from({ length: 4 }).map((_, i) => (
                <Skeleton key={i} className="h-40 w-full" />
              ))
            ) : metrics ? (
              <>
                <MetricCard
                  icon="users"
                  title="Total Patients"
                  value={metrics.totalPatients.toString()}
                  growth={metrics.patientGrowth}
                  data-testid="card-total-patients"
                />
                <MetricCard
                  icon="calendar-check"
                  title="Total Appointment"
                  value={metrics.totalAppointments.toString()}
                  growth={metrics.appointmentGrowth}
                  data-testid="card-total-appointments"
                />
                <MetricCard
                  icon="dollar-sign"
                  title="Total Income"
                  value={`$${metrics.totalIncome}`}
                  growth={metrics.incomeGrowth}
                  data-testid="card-total-income"
                />
                <MetricCard
                  icon="procedures"
                  title="Total Treatments"
                  value={metrics.totalTreatments.toString()}
                  growth={metrics.treatmentGrowth}
                  data-testid="card-total-treatments"
                />
              </>
            ) : (
              <div className="col-span-4 text-center text-text-secondary">
                Failed to load metrics data
              </div>
            )}
          </div>

          {/* Overview and Appointments */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 mb-6 lg:mb-8">
            <div className="lg:col-span-2 order-2 lg:order-1">
              {chartLoading ? (
                <Skeleton className="h-80 w-full" />
              ) : chartData ? (
                <OverviewChart data={chartData} />
              ) : (
                <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm h-80 flex items-center justify-center">
                  <span className="text-text-secondary">Failed to load chart data</span>
                </div>
              )}
            </div>

            <div className="order-1 lg:order-2">
              {appointmentsLoading ? (
                <Skeleton className="h-80 w-full" />
              ) : appointments ? (
                <AppointmentList appointments={appointments} />
              ) : (
                <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm h-80 flex items-center justify-center">
                  <span className="text-text-secondary">Failed to load appointments</span>
                </div>
              )}
            </div>
          </div>

          {/* Patient List */}
          {patientsLoading ? (
            <Skeleton className="h-96 w-full" />
          ) : patients ? (
            <PatientTable patients={patients} />
          ) : (
            <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm h-96 flex items-center justify-center">
              <span className="text-text-secondary">Failed to load patients data</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
