import Navbar from '@/lib/components/navigation/Navbar';
import { createFileRoute, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/_pathLessLayout')({
  component: RouteComponent,
})

function RouteComponent() {
  return( <div>
    <Navbar />
    <Outlet />
  </div>);
}
