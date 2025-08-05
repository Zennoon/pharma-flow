import CreateUserForm from '@/components/create-user-form'
import React from 'react'

export default function Page() {
  return (
    <div className='bg-background flex flex-col items-center justify-center gap-6 p-6 md:p-10'>
        <div className='w-full max-w-sm'>
            <CreateUserForm />
        </div>
    </div>
  )
}
