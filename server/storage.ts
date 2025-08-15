import { db } from "./db/client";
import {
  patients,
  appointments,
  metrics,
  chartData,
  users,
  InsertPatient,
  InsertAppointment,
  InsertMetrics,
  InsertChartData,
  InsertUser
} from "../shared/schema";
import { eq } from "drizzle-orm";

// -------- PATIENTS --------
export async function getPatients() {
  return await db.select().from(patients);
}

export async function getPatientById(id: string) {
  return await db.select().from(patients).where(eq(patients.id, id));
}

export async function addPatient(data: InsertPatient) {
  return await db.insert(patients).values(data).returning();
}

// -------- APPOINTMENTS --------
export async function getAppointments() {
  return await db.select().from(appointments);
}

export async function addAppointment(data: InsertAppointment) {
  return await db.insert(appointments).values(data).returning();
}

// -------- METRICS --------
export async function getMetrics() {
  return await db.select().from(metrics);
}

export async function updateMetrics(data: InsertMetrics) {
  return await db.insert(metrics).values(data).onConflictDoUpdate({
    target: metrics.id,
    set: data
  }).returning();
}

// -------- CHART DATA --------
export async function getChartData() {
  return await db.select().from(chartData);
}

export async function addChartData(data: InsertChartData) {
  return await db.insert(chartData).values(data).returning();
}

// -------- USERS --------
export async function getUsers() {
  return await db.select().from(users);
}

export async function addUser(data: InsertUser) {
  return await db.insert(users).values(data).returning();
}



// storage.ts (additional exports)
export const storage = {
  patients: {
    list: getPatients,
    get: getPatientById,
    create: addPatient,
  },
  appointments: {
    list: getAppointments,
    create: addAppointment,
  },
  metrics: {
    get: getMetrics,
    update: updateMetrics,
  },
  charts: {
    get: getChartData,
    add: addChartData,
  },
  users: {
    list: getUsers,
    create: addUser,
  },
};

