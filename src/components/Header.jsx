import React, { useState } from 'react'
import { useAuth } from '../contexts/AuthContext';
import { useProfile } from '../contexts/ProfileContext'
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion'
import { animaciones } from '../utils/animations'
import {
  Button,
  MegaMenu,
  MegaMenuDropdown,
  NavbarBrand,
  NavbarCollapse,
  NavbarLink,
  NavbarToggle,
  Avatar
} from "flowbite-react";

import SidebarProfile from './sidebarProfile'



const Header = () => {
  const [openLogin, setOpenLogin] = useState(true);
  const { user, logoutUser } = useAuth()
  const { currentProfile } = useProfile()

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
 

  return (
    <>
      <MegaMenu className="bg-[#E50914] text-gray-200">
        <NavbarBrand href="/">

          {/* <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white ">NextFliks</span> */}
          <img alt="" src="/logo_blanco-removebg.png" className="h-10" />
        </NavbarBrand>
        <div className="order-2 hidden items-center md:flex">
          {   ///si esta logueado muestra el boton logout
            user ?

              !currentProfile && <Button color='dark' onClick={logoutUser} >Logout</Button>

              :
              <>
                <Link to="/login" >
                  <Button color='alternative' className=" py-2 text-sm font-medium text-gray-800 hover:bg-gray-300 focus:outline-none focus:ring-4 focus:ring-gray-300 md:mr-2 md:px-5 md:py-2.5 dark:text-white dark:hover:bg-gray-700 dark:focus:ring-gray-800">Login</Button>
                </Link>

                <Link to="/registro">
                  <Button color='dark' >Sign up</Button>
                </Link>
              </>
          }
          <div className="flex ">
           {currentProfile && <Avatar img={`/avatars/${currentProfile?.avatar}`} alt={`avatar de ${currentProfile?.name}`} rounded onClick={toggleSidebar} className='cursor-pointer p-0 m-0 ' />}

            <div className='flex flex-col absolute   w-65 top-15 right-0   '>
              <AnimatePresence initial={false}>
                {isSidebarOpen &&
                  <motion.div
                    variants={animaciones()}
                    initial='initial_menu'
                    animate='animate_menu'
                    exit='exit_menu'
                    transition={{ duration: 0.5 }}
                    className='relative    dark:bg-gray-800 w-40 sm:w-110  z-50   overflow-y-auto scrollbar-thin scrollbar-track-gray-700 scrollbar-thumb-gray-600'
                  >
                    <SidebarProfile onClose={toggleSidebar} />

                  </motion.div>}
              </AnimatePresence>
            </div>

          </div>
        </div>

        <NavbarToggle />
        <NavbarCollapse>
          <Link to="/" className='hover:text-black'>Home</Link>
          <NavbarLink className='text-gray-200'>
            <MegaMenuDropdown toggle={<>Company</>}>
              <ul className="grid grid-cols-3">
                <div className="space-y-4 p-4">
                  <li>
                    <a href="#" className="hover:text-primary-600 dark:hover:text-primary-500">
                      About Us
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-primary-600 dark:hover:text-primary-500">
                      Library
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-primary-600 dark:hover:text-primary-500">
                      Resources
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-primary-600 dark:hover:text-primary-500">
                      Pro Version
                    </a>
                  </li>
                </div>
                <div className="space-y-4 p-4">
                  <li>
                    <a href="#" className="hover:text-primary-600 dark:hover:text-primary-500">
                      Contact Us
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-primary-600 dark:hover:text-primary-500">
                      Support Center
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-primary-600 dark:hover:text-primary-500">
                      Terms
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-primary-600 dark:hover:text-primary-500">
                      Blog
                    </a>
                  </li>
                </div>
                <div className="space-y-4 p-4">
                  <li>
                    <a href="#" className="hover:text-primary-600 dark:hover:text-primary-500">
                      Newsletter
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-primary-600 dark:hover:text-primary-500">
                      Playground
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-primary-600 dark:hover:text-primary-500">
                      License
                    </a>
                  </li>
                </div>
              </ul>
            </MegaMenuDropdown>
          </NavbarLink>
          <Link to="/movies" className="hover:text-primary-600 dark:hover:text-primary-500">
            Peliculas
          </Link>
          <NavbarLink className='text-gray-200' href="#">Team</NavbarLink>
          <NavbarLink className='text-gray-200' href="#">Contact</NavbarLink>
        </NavbarCollapse>
      </MegaMenu>

    </>
  );
}

export default Header;