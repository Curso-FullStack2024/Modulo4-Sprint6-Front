import { useNavigate, Link } from "react-router-dom";
import { Sidebar, SidebarCollapse, SidebarItem, SidebarItemGroup, SidebarItems } from "flowbite-react";
import { useAuth } from "../contexts/AuthContext";
import Swal from "sweetalert2";
import { toast } from 'react-toastify'

const SidebarProfile = ({ onClose }) => {
  const { logoutUser, deleteUser } = useAuth()
  const navigate = useNavigate()

  const handleDelete = () => {
          Swal.fire({
              title: '¿Estás seguro?',
              text: "No podrás recuperar una cuenta Borrada",
              icon: 'warning',
              showCancelButton: true,
              confirmButtonColor: '#3085d6',
              cancelButtonColor: '#d33',
              confirmButtonText: 'Sí, eliminar',
              cancelButtonText: 'Cancelar'
          }).then(async (result) => {
              if (result.isConfirmed) {
                  try {          
                      await toast.promise(
                          deleteUser(),
                          {
                              pending: 'Eliminando cuenta...',
                              success: 'Cuenta eliminada con éxito! 🎉',
                              error: 'Error al eliminar la cuenta '
                          }
                      );
                      //vuelve al home
                      onClose()
                       navigate(`/`)
  
                  } catch (error) {
                      Swal.fire({
                          icon: 'error',
                          title: 'Error',
                          text: 'No se pudo eliminar la cuenta',
                          footer: error.response.data.message,
                          confirmButtonText: 'Aceptar'
                      })
                      console.error('Error deleting account:', error)
  
                  }
              }
          })
      }

  return (
    <Sidebar aria-label="Default sidebar example " className="w-65  bg-gray-200 dark:bg-gray-800  top-15 right-0 z-50 ">
      <SidebarItems>
        <SidebarItemGroup>

          <SidebarItem href="#" >
            <Link to="/profiles" className="flex items-center" onClick={onClose}>
              <i className="bi bi-people pr-2" />  Cambiar de perfil
            </Link>

          </SidebarItem>

          <SidebarItem href="#" label="Pro" labelColor="dark">
            <i className="bi bi-list-stars pr-2" /> Mi lista
          </SidebarItem>
          
          <SidebarCollapse label='Cuenta'>
            <SidebarItem href="#" onClick={handleDelete}>
             <i className="bi bi-person-x pr-2"/>Borrar Cuenta
            </SidebarItem>
            <SidebarItem  href="#"  >
            <Link to="/cambiarpassword" className="flex items-center" onClick={onClose}>
             <i className="bi bi-pass pr-2"/>Cambiar contraseña
             </Link>
            </SidebarItem>            
          </SidebarCollapse>
          <SidebarItem onClick={() => { logoutUser(); onClose() }} className='cursor-pointer' >
            <i className="bi bi-box-arrow-left pr-2" /> Logout
          </SidebarItem>
          <SidebarItem href="#" >
            <div className='flex justify-center items-center'>
              <i className="bi bi-x-square dark:text-red-600 text-md cursor-pointer p-0 m-0" onClick={onClose}></i>
            </div>
          </SidebarItem>
        </SidebarItemGroup>
      </SidebarItems>
    </Sidebar>
  );
}

export default SidebarProfile;