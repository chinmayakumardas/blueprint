export const canAccessModule = (role, module) => {
  const accessMap = {
    cpc: ['dashboard', 'clients', 'projects', 'task', 'contact', 'bug'],
    employee: ['dashboard', 'task', 'bug'],
  };

  return accessMap[role]?.includes(module);
};




//this part is sample code for checking permissions
// import { canAccessModule } from '@/lib/permissions';

// const userRole = localStorage.getItem('role');

// {canAccessModule(userRole, 'clients') && (
//   <Link href="/clients" className="sidebar-link">Clients</Link>
// )}

// {canAccessModule(userRole, 'projects') && (
//   <Link href="/projects" className="sidebar-link">Projects</Link>
// )}
