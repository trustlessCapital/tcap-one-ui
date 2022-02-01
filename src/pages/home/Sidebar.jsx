import React from 'react';
import {
  CDBSidebar,
  CDBSidebarContent,
  CDBSidebarFooter,
  CDBSidebarHeader,
  CDBSidebarMenu,
  CDBSidebarMenuItem,
} from 'cdbreact';
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div className="sides" style={{ height: '100vh', paddingTop:"0rem", overflow: 'scroll initial' }}>
      <CDBSidebar textColor="#fff" backgroundColor="#333">
        <CDBSidebarHeader prefix={<i className="fa fa-bars fa-large"></i>}>
          <a href="/" className="text-decoration-none" style={{ color: 'inherit' }}>
            Dashboard
          </a>
        </CDBSidebarHeader>

        <CDBSidebarContent className="sidebar-content">
          <CDBSidebarMenu>
            <NavLink exact to="/" activeClassName="activeClicked">
              <CDBSidebarMenuItem className="items" icon="columns">My Details</CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact to="/MyDraftInvoicesVendor" activeClassName="activeClicked">
              <CDBSidebarMenuItem className="items" icon="table">My Draft Invoices</CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact to="/CompletedDealsVendor" activeClassName="activeClicked">
              <CDBSidebarMenuItem className="items" icon="user">Completed Deals</CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact to="/MyFavourites" activeClassName="activeClicked">
              <CDBSidebarMenuItem className="items" icon="chart-line">My Favourites</CDBSidebarMenuItem>
            </NavLink>
            
          </CDBSidebarMenu>
        </CDBSidebarContent>

        <CDBSidebarFooter style={{ textAlign: 'center' }}>
          <div
            style={{
              padding: '20px 5px',
            }}
          >
            Sidebar Footer
          </div>
        </CDBSidebarFooter>
      </CDBSidebar>
    </div>
  );
};

export default Sidebar;
