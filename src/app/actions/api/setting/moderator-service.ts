// 'use server'

import { getCookie } from "cookies-next"


export async function getDepartment() {
    const token = getCookie('token')
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/get-departments`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    if(!res.ok) {
        throw new Error('Failed to fetch departments')
    }
    const data = await res.json()
    return data.data
}