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
              <CDBSidebarMenuItem className="items" icon="columns">Dashboard</CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact to="/AdminManageUsers" activeClassName="activeClicked">
              <CDBSidebarMenuItem className="items" icon="columns">Manage Users</CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact to="/AdminManageEntity" activeClassName="activeClicked">
              <CDBSidebarMenuItem className="items" icon="table">Manage Entity</CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact to="/AdminPendingApproval" activeClassName="activeClicked">
              <CDBSidebarMenuItem className="items" icon="user">Pending Approval</CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact to="/AdminAllDeals" activeClassName="activeClicked">
              <CDBSidebarMenuItem className="items" icon="chart-line">All Deals</CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact to="/AdminActiveDeals" activeClassName="activeClicked">
              <CDBSidebarMenuItem className="items" icon="chart-line">Active Deals</CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact to="/AdminCompletedDeals" activeClassName="activeClicked">
              <CDBSidebarMenuItem className="items" icon="chart-line">Completed Deals</CDBSidebarMenuItem>
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
