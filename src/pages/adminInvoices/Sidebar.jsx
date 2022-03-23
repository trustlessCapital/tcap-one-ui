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
            <NavLink style={{textDecoration : "none"}} exact to="/" activeClassName="activeClicked">
              <CDBSidebarMenuItem className="items" icon="columns">Dashboard</CDBSidebarMenuItem>
            </NavLink>
            <NavLink style={{textDecoration : "none"}} exact to="/AdminManageUsers" activeClassName="activeClicked">
              <CDBSidebarMenuItem className="items" icon="columns">Manage Users</CDBSidebarMenuItem>
            </NavLink>
            <NavLink style={{textDecoration : "none"}} exact to="/AdminManageEntity" activeClassName="activeClicked">
              <CDBSidebarMenuItem className="items" icon="table">Manage Entity</CDBSidebarMenuItem>
            </NavLink>
            <NavLink style={{textDecoration : "none"}} exact to="/AdminManageRelationships" activeClassName="activeClicked">
              <CDBSidebarMenuItem className="items" icon="user">Manage Relationships</CDBSidebarMenuItem>
            </NavLink>
            <NavLink style={{textDecoration : "none"}} exact to="/AdminPendingApprovals" activeClassName="activeClicked">
              <CDBSidebarMenuItem className="items" icon="user">Pending Approvals</CDBSidebarMenuItem>
            </NavLink>
            <NavLink style={{textDecoration : "none"}} exact to="/addinvoices" activeClassName="activeClicked">
              <CDBSidebarMenuItem className="items" icon="chart-line">Upload Invoice</CDBSidebarMenuItem>
            </NavLink>
            <NavLink style={{textDecoration : "none"}} exact to="/AdminActiveDeals" activeClassName="activeClicked">
              <CDBSidebarMenuItem className="items" icon="chart-line">Active Deals</CDBSidebarMenuItem>
            </NavLink>
            <NavLink style={{textDecoration : "none"}} exact to="/AdminCompletedDeals" activeClassName="activeClicked">
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
