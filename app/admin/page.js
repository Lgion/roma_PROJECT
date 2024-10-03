import { PrismaClient } from '@prisma/client'
import AdminContent from './AdminContent'

const prisma = new PrismaClient()

async function getInitialData() {
  const users = await prisma.user.findMany()
  const drivers = await prisma.driver.findMany()
  const vehicles = await prisma.vehicle.findMany()
  const orders = await prisma.order.findMany()

  const serializeDate = (obj) => {
    for (let [key, value] of Object.entries(obj)) {
      if (value instanceof Date) {
        obj[key] = value.toISOString()
      } else if (typeof value === 'object' && value !== null) {
        serializeDate(value)
      }
    }
    return obj
  }

  const serializedData = {
    users: users.map(serializeDate),
    drivers: drivers.map(serializeDate),
    vehicles: vehicles.map(serializeDate),
    orders: orders.map(serializeDate),
  }

  return serializedData
}

export default async function AdminPage() {
  const initialData = await getInitialData()
  return <AdminContent initialData={initialData} />
}