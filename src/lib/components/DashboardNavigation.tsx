import { Input } from '@/components/ui/input'
import { Button } from './ui/button'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { AvatarImage } from '@radix-ui/react-avatar'
import { Bell } from 'lucide-react'

const DashboardNavigation = () => {
    return (

        <header className='w-full max-h-15 shadow px-auto'>
            <section className="flex p-3 justify-end">
                <section className='flex flex-0 w-auto px-auto space-x-2.5'>
                    <Input id="search" type="search" placeholder='Search here' className='w-50' />
                    <Button className='rounded-lg p-4 bg-black/3 transition duration-300 hover:translate-y-2'><Bell className='text-gray-500' /></Button>
                    <div className="w-14 h-14 transition duration-300 hover:translate-y-2">
                        <Avatar>
                            <AvatarImage className='w-9 h-9 rounded-full' src="https://github.com/shadcn.png" />
                            <AvatarFallback>AJ</AvatarFallback>
                        </Avatar>
                    </div>
                </section>
            </section>
        </header>

    )
}

export default DashboardNavigation