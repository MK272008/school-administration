import ParentLayout from '@/layouts/Dashboards/Parent'
import React from 'react'
import type { NextPage } from '@/interfaces/app'

const ParentClassroom: NextPage = () => {
  return (
    <div className=''>
      assignments etc
    </div>
  )
}

ParentClassroom.getLayout = (page) => (
  <ParentLayout>
    {page}
  </ParentLayout>
)

export default ParentClassroom
