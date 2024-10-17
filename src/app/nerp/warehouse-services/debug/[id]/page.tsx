import React from 'react'

export default function Page({params}: {params: {id: string}}) {

    const {id} = params
    console.log(id)
  return (
    <div>page</div>
  )
}
