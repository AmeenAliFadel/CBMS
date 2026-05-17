export type Trip = {
  id: number
  carName: string
  total: string
  dates: string
  location: string
  tags: string[]
  status: "upcoming" | "completed" | "cancelled"
  primaryAction: string
  image: string
}