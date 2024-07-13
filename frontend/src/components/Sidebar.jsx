import './Sidebar.css';
import { Link, useNavigate } from 'react-router-dom';
import { NavDropdown } from 'react-bootstrap';

export default function Sidebar () {

    const navigate = useNavigate();

    return (
        <div className="sidebar-wrapper">
            <nav id="sidebar">
                <ul className="list-unstyled components">
               
        
                <li>
                    <NavDropdown title={
                        <i className='fa fa-product-hunt'> Available Services</i>
                    }>
                        <NavDropdown.Item  onClick={() => navigate('/ProductDetails')} > <i className='fa fa-shopping-basket'> All</i></NavDropdown.Item>
                        <NavDropdown.Item  onClick={() => navigate('/CreateService')} > <i className='fa fa-plus'> Create </i></NavDropdown.Item>
                        
                    </NavDropdown>
                </li>

               

              
        
            </ul>
            </nav>
        </div>
    )
}