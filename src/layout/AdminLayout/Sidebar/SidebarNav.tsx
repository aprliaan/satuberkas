import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  IconDefinition,
} from '@fortawesome/free-regular-svg-icons'
import {
  faGauge,
  faUsers,
  faUserPlus,
  faFolderOpen,
  faFileCircleXmark,
  
} from '@fortawesome/free-solid-svg-icons'
import React, {PropsWithChildren} from 'react'
import {Nav} from 'react-bootstrap'
import Link from 'next/link'

type SidebarNavItemProps = {
  href: string;
  icon?: IconDefinition;
} & PropsWithChildren

const SidebarNavItem = (props: SidebarNavItemProps) => {
  const {
    icon,
    children,
    href,
  } = props

  return (
    <Nav.Item className='hover:bg-amber-500 m-1 active:bg-orange-500 rounded-md'>
      <Link href={href} passHref legacyBehavior>
        <Nav.Link className="px-3 py-2 d-flex align-items-center text-white text-sm font-semibold">
          {icon ? <FontAwesomeIcon className="nav-icon ms-n3" icon={icon} />
            : <span className="nav-icon ms-n3" />}
          {children}
        </Nav.Link>
      </Link>
    </Nav.Item>
  )
}

const SidebarNavTitle = (props: PropsWithChildren) => {
  const { children } = props

  return (
    <li className="nav-title px-3 py-2 mx-3 mt-3 text-uppercase fw-bold text-white font-bold border-b-2 border-gray-100">{children}</li>
  )
}


export default function SidebarNav() {
  return (
    <ul className="list-unstyled">
      <SidebarNavTitle>Admin</SidebarNavTitle>
      <SidebarNavItem icon={faGauge} href="/">
        Dashboard
      </SidebarNavItem>
      <SidebarNavTitle>Penduduk</SidebarNavTitle>
      <SidebarNavItem icon={faUsers} href="/data_penduduk">
        Data Penduduk
      </SidebarNavItem>
      <SidebarNavItem icon={faUserPlus} href="/tambah_penduduk">
        Tambah Data Penduduk
      </SidebarNavItem>
      <SidebarNavTitle>Surat</SidebarNavTitle>
      <SidebarNavItem icon={faFolderOpen} href="/rekap_surat">Rekap Surat</SidebarNavItem>
      <SidebarNavItem icon={faFileCircleXmark} href="/history_penghapusan">History Penghapusan Surat</SidebarNavItem>
    </ul>
  )
}
