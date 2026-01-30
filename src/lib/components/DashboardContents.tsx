import { ChartBarMultiple } from "./ChartBarMultiple"
import { ChartBarStacked } from "./ChartBarStacked"


const DashboardContents = () => {
  return (
    <div className='flex flex-1 flex-col w-full h-screen bg-black/2'>
      <section className="flex w-full flex-col justify-center items-center gap-4  h-auto p-4 sm:flex-row ">
        <ChartBarStacked />
        <ChartBarStacked />
        <ChartBarStacked />
      </section>
      <section className="flex w-full justify-center p-4 h-auto">
        <ChartBarMultiple />
      </section>
    </div>
  )
}

export default DashboardContents