import React, { useState } from 'react';
import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import LoginSignin from '../components/utils/auth/login';
import RegisterModal from '../components/utils/auth/RegisterMoldal';
import { useAuth } from '../components/utils/auth/AuthContext';
import { useNavigate } from 'react-router-dom';
// import './Navbar.css';

const Navbarx = () => {
  const { isAuthenticated, user, logout, role } = useAuth();
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const navigate = useNavigate();

  const openLoginModal = () => setIsLoginOpen(true);
  const closeLoginModal = () => setIsLoginOpen(false);

  const openRegisterModal = () => setIsRegisterOpen(true);
  const closeRegisterModal = () => setIsRegisterOpen(false);

  return (
    <>
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container>
          <Navbar.Brand href="/">Bookedge</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
                                    
              {isAuthenticated ? (
                <>
                  {role === 'client' ? (
                    <>
                      <Nav.Link href="/cabins">Cabañas</Nav.Link>
                      <Nav.Link href="/rooms">Habitaciones</Nav.Link>
                      <Nav.Link href="/plans">Planes</Nav.Link>
                      <Nav.Link href="/contact">Contáctanos</Nav.Link>
                      <NavDropdown title={user?.name || "Mi Cuenta"} id="basic-nav-dropdown">
                        <NavDropdown.Item onClick={() => navigate('/profile')}>Mi Perfil</NavDropdown.Item>
                        <NavDropdown.Item onClick={logout}>Cerrar Sesión</NavDropdown.Item>
                      </NavDropdown>
                    </>
                  ) : (
                    <>
                      
                      <NavDropdown title={user?.name || "Mi Cuenta"} id="basic-nav-dropdown">
                        <NavDropdown.Item onClick={() => navigate('/profile')}>Mi Perfil</NavDropdown.Item>
                        <NavDropdown.Item href="/settings">Configuración</NavDropdown.Item>
                        <NavDropdown.Item onClick={logout}>Cerrar Sesión</NavDropdown.Item>
                      </NavDropdown>
                    </>
                  )}
                </>
              ) : (
                <>
                  <button
                    type="button"
                    className="btn bg-primary me-2"
                    onClick={openLoginModal}
                    style={{ fontSize: '14px', padding: '6px 12px' }}
                  >
                    Iniciar Sesión
                  </button>
                  <button
                    type="button"
                    className="btn bg-primary"
                    onClick={openRegisterModal}
                    style={{ fontSize: '14px', padding: '6px 12px' }}
                  >
                    Registrarse
                  </button>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      {isLoginOpen && <LoginSignin isOpen={isLoginOpen} closeLoginModal={closeLoginModal} />}
      {isRegisterOpen && <RegisterModal isOpen={isRegisterOpen} clickModal={closeRegisterModal} />}
    </>
  );
};

export default Navbarx;
