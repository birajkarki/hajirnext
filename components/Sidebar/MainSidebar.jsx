'use client'
import React, { useState } from 'react'
import Drawer from '@mui/material/Drawer'
import Divider from '@mui/material/Divider'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import HomeIcon from '@mui/icons-material/Home'
import SortIcon from '@mui/icons-material/Sort'
import BusinessIcon from '@mui/icons-material/Business'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import TestProfileCard from '../testprofile/TestProfileCard'
import LogoutButton from './LogoutButton'
import { getRequest } from '@/services/ApiRequestService'
import { useAuth } from '@/context/AuthContext'
import Image from 'next/image'

const MainSidebar = () => {
  const { authUser, setAuthUser, setIsLoggedIn } = useAuth()
  console.log(authUser)
  const router = useRouter()
  const [hoveredItem, setHoveredItem] = useState(null)
  const [selectedItem, setSelectedItem] = useState(null)

  const LINKS = [
    { text: 'Home', href: '/dashboard', icon: HomeIcon },
    { text: 'Company', href: '/dashboard/company', icon: BusinessIcon },
    { text: 'My Plans', href: '/dashboard/myplansbiraj', icon: SortIcon },
    { text: 'split screen', href: '/dashboard/splitscreen', icon: SortIcon },
  ]

  const onLogoutClick = async (e) => {
    const logout = await getRequest(`/employer/logout`)
    if (logout) {
      localStorage.clear()
      setIsLoggedIn(false)
      setAuthUser(null)
      return router.push('/login')
    }
  }
  const handleItemClick = (href) => {
    setSelectedItem(href)
    setHoveredItem(null)
  }

  return (
    <Drawer
      variant="permanent"
      anchor="left"
      sx={{
        width: 250,
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <Link href="/dashboard">
          <Image
            src="/hajir-logo.png"
            width={150}
            height={50}
            alt="Hajir Logo"
          />
        </Link>
      </div>

      <div style={{ marginLeft: '4px' }}>
        <TestProfileCard />
      </div>
      <List sx={{ flexGrow: 1 }}>
        {LINKS.map(({ text, href, icon: Icon }) => (
          <ListItem key={href} disablePadding>
            <ListItemButton
              component={Link}
              href={href}
              selected={selectedItem === href || router.pathname === href}
              onClick={() => handleItemClick(href)}
              onMouseEnter={() => setHoveredItem(href)}
              onMouseLeave={() => setHoveredItem(null)}
              sx={{
                '&:hover': {
                  backgroundColor:
                    hoveredItem === href ? '#22408B15' : 'transparent',
                },
                ...(selectedItem === href || router.pathname === href
                  ? {
                      backgroundColor: '#22408B15',
                    }
                  : {}),
              }}
            >
              <ListItemIcon>
                {typeof Icon === 'string' ? (
                  <img src={Icon} alt={text} />
                ) : (
                  <Icon />
                )}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        <LogoutButton onClick={(e) => onLogoutClick(e)} />
      </List>
    </Drawer>
  )
}

export default MainSidebar
