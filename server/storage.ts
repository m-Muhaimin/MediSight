import { type User, type InsertUser, type Patient, type InsertPatient, type Appointment, type InsertAppointment, type Metrics, type InsertMetrics, type ChartData, type InsertChartData } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  getAllPatients(): Promise<Patient[]>;
  getPatient(id: string): Promise<Patient | undefined>;
  createPatient(patient: InsertPatient): Promise<Patient>;
  
  getAllAppointments(): Promise<Appointment[]>;
  getAppointment(id: string): Promise<Appointment | undefined>;
  createAppointment(appointment: InsertAppointment): Promise<Appointment>;
  
  getMetrics(): Promise<Metrics | undefined>;
  updateMetrics(metrics: InsertMetrics): Promise<Metrics>;
  
  getChartData(): Promise<ChartData[]>;
  createChartData(data: InsertChartData): Promise<ChartData>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private patients: Map<string, Patient>;
  private appointments: Map<string, Appointment>;
  private metrics: Metrics | undefined;
  private chartData: Map<string, ChartData>;

  constructor() {
    this.users = new Map();
    this.patients = new Map();
    this.appointments = new Map();
    this.chartData = new Map();
    this.initializeDefaultData();
  }

  private initializeDefaultData() {
    // Initialize metrics
    this.metrics = {
      id: randomUUID(),
      totalPatients: 579,
      totalAppointments: 54,
      totalIncome: "8399.24",
      totalTreatments: 112,
      patientGrowth: "+15%",
      appointmentGrowth: "+10%",
      incomeGrowth: "+28%",
      treatmentGrowth: "+12%",
      updatedAt: new Date(),
    };

    // Initialize chart data
    const chartDataItems = [
      { month: "Jan", hospitalizedPatients: 100, outpatients: 80 },
      { month: "Feb", hospitalizedPatients: 120, outpatients: 90 },
      { month: "Mar", hospitalizedPatients: 115, outpatients: 70 },
      { month: "Apr", hospitalizedPatients: 140, outpatients: 130 },
      { month: "May", hospitalizedPatients: 180, outpatients: 150 },
      { month: "Jun", hospitalizedPatients: 130, outpatients: 98 },
    ];

    chartDataItems.forEach(item => {
      const id = randomUUID();
      const chartDataItem: ChartData = { ...item, id };
      this.chartData.set(id, chartDataItem);
    });

    // Initialize patients
    const patientData = [
      { name: "Brooklyn Simmons", gender: "Male", dateOfBirth: "1995-03-18", department: "Cardiology", patientId: "#OMT23AA", avatar: "BS" },
      { name: "Anthony Johnson", gender: "Male", dateOfBirth: "1997-03-18", department: "Cardiology", patientId: "#AT456BB", avatar: "AJ" },
      { name: "Sarah Miller Olivia", gender: "Female", dateOfBirth: "1987-03-18", department: "Oncology", patientId: "#EA789CC", avatar: "SO" },
    ];

    patientData.forEach(patient => {
      const id = randomUUID();
      const patientRecord: Patient = { ...patient, id };
      this.patients.set(id, patientRecord);
    });

    // Initialize appointments
    const appointmentData = [
      { patientName: "Brooklyn Simmons", appointmentType: "Allergy Testing", appointmentDate: "2024-08-16", appointmentTime: "10:30", status: "scheduled" },
      { patientName: "Courtney Henry", appointmentType: "Routine Lab Tests", appointmentDate: "2024-08-16", appointmentTime: "10:00", status: "scheduled" },
      { patientName: "Sarah Miller Olivia", appointmentType: "Chronic Disease Management", appointmentDate: "2024-08-15", appointmentTime: "15:00", status: "scheduled" },
      { patientName: "Esther Howard", appointmentType: "Allergy Testing", appointmentDate: "2024-08-15", appointmentTime: "14:00", status: "scheduled" },
      { patientName: "Arlene McCoy", appointmentType: "Routine Lab Tests", appointmentDate: "2024-08-15", appointmentTime: "11:30", status: "scheduled" },
      { patientName: "Jane Cooper", appointmentType: "Acute Illness", appointmentDate: "2024-08-15", appointmentTime: "10:00", status: "scheduled" },
    ];

    appointmentData.forEach(appointment => {
      const id = randomUUID();
      const appointmentRecord: Appointment = { ...appointment, id, patientId: randomUUID() };
      this.appointments.set(id, appointmentRecord);
    });
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async getAllPatients(): Promise<Patient[]> {
    return Array.from(this.patients.values());
  }

  async getPatient(id: string): Promise<Patient | undefined> {
    return this.patients.get(id);
  }

  async createPatient(insertPatient: InsertPatient): Promise<Patient> {
    const id = randomUUID();
    const patient: Patient = { ...insertPatient, id };
    this.patients.set(id, patient);
    return patient;
  }

  async getAllAppointments(): Promise<Appointment[]> {
    return Array.from(this.appointments.values());
  }

  async getAppointment(id: string): Promise<Appointment | undefined> {
    return this.appointments.get(id);
  }

  async createAppointment(insertAppointment: InsertAppointment): Promise<Appointment> {
    const id = randomUUID();
    const appointment: Appointment = { ...insertAppointment, id };
    this.appointments.set(id, appointment);
    return appointment;
  }

  async getMetrics(): Promise<Metrics | undefined> {
    return this.metrics;
  }

  async updateMetrics(insertMetrics: InsertMetrics): Promise<Metrics> {
    const id = this.metrics?.id || randomUUID();
    this.metrics = { ...insertMetrics, id, updatedAt: new Date() };
    return this.metrics;
  }

  async getChartData(): Promise<ChartData[]> {
    return Array.from(this.chartData.values());
  }

  async createChartData(insertData: InsertChartData): Promise<ChartData> {
    const id = randomUUID();
    const data: ChartData = { ...insertData, id };
    this.chartData.set(id, data);
    return data;
  }
}

export const storage = new MemStorage();
